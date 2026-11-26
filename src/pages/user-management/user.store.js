import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userService } from './userService'
import { message } from 'ant-design-vue'


export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const userRoles = ref([])
    const loading = ref(false)
    const userModalOpen = ref(false)
    const userDraft = ref({})
    const isEditMode = ref({})
    const userSearch = ref(""),
    userStatus = ref("all"),
    selectedUser = ref(null);

    const visibleUsers = computed(() =>
        users.value.filter((user) => {
            const query = userSearch.value.toLowerCase();
            const matchesText =
                !query ||
                user.name?.toLowerCase().includes(query) ||
                user.email?.toLowerCase().includes(query);
            const matchesStatus =
                userStatus.value === "all" ||
                user.status?.toLowerCase() === userStatus.value;
            return matchesText && matchesStatus;
        }),
    );

    function removeProfileImage() {
        userDraft.value = {
            ...userDraft.value,
            profileImage: ""
        }

    }


    async function fetchUsers() {
        loading.value = true
        try {
            const res  = await userService.getUsers()
            console.log(res)
            if(res?.success) {
                const userData = res?.data
                if (userData && Array.isArray(userData)) {
                    users.value = userData.map(user => ({
                        ...user,
                        roleName: user.role?.name ?? '',
                        roleId: user.role?.id ?? '',
                        activitiesCount: user.activities?.length ?? 0,
                        status: user.isActive ? 'Active' : 'Inactive',
                        profileImage: user.profileImage || user.avatar || ''
                    }))
                } 
            } else {
                console.error('Invalid response format:', res)
            }
        } catch (err) {
            console.error('Failed to load users:', err)
        } finally {
            loading.value = false
        }
    }

    async function fetchUserRoles() {
        try {
            const res = await userService.getUserRoles()
            if (res.data && Array.isArray(res.data)) {
                userRoles.value = res.data
            } else {
                console.error('Invalid response format:', res)
            }
        } catch (err) {
            console.error('Failed to load user roles:', err)
        }
    }

    function openUserModal(user = null) {
        userModalOpen.value = true
        userDraft.value = user || {}

        if (user) {
            isEditMode.value = true;
            userDraft.value = {
                ...user,
                roleId: user.roleId ?? user.role?.id ?? '',
                profileImage: user.profileImage || user.avatar || '',
                password: '',
                confirmPassword: ''
            }
        } else {
            isEditMode.value = false;
            userDraft.value = {
                id: null,
                name: '',
                email: '',
                isActive: true,
                roleId: "",
                password: '',
                confirmPassword: '',
                profileImage: ""
            }
        }
    }

    function passwordsMatch() {
        return userDraft.value.password === userDraft.value.confirmPassword
    }

    async function saveUser() {
        const newUser = {...userDraft.value }

        const isEditing = Boolean(newUser.id)
        if ((!isEditing || newUser.password || newUser.confirmPassword) && !passwordsMatch()) {
            message.error('Password and confirm password do not match!')
            return
        }
        loading.value = true

        const userPayload = {
            ...(isEditing ? { id: newUser.id } : { id: 0 }),
            name: newUser.name,
            email: newUser.email,
            isActive: newUser.isActive,
            roleId: newUser.roleId,
            profileImage: newUser.profileImage || "",
            password: newUser.password ? newUser.password : ""
        }

        try {
            const res = isEditing
                ? await userService.updateUser(userPayload)
                : await userService.createUser(userPayload)

            message.success(isEditing ? 'User updated successfully' : 'User created successfully')
            loading.value = false
            await fetchUsers()
            userModalOpen.value = false
            userDraft.value = { id: null, name: '', email: '', isActive: true, roleId: '', password: '', confirmPassword: '', profileImage: '' }
        } catch (err) {
            loading.value = false
            console.error(isEditing ? 'Failed to update user:' : 'Failed to create user:', err)
            message.error(err.response?.data?.message || err.message || 'Could not save user')
        }
    }

    async function deleteUser(id) {
        try {
            await userService.deleteUser(id)
            message.success('User deleted successfully')
            await fetchUsers()
        } catch (err) {
            console.error('Failed to delete user:', err)
            message.error(err.response?.data?.message || 'Failed to delete user')
            throw err
        }
    }

    function handleImageUpload(event) {
        const file = event.target.files?.[0]

        if (!file) return

        // Validate image type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image.')
            event.target.value = ''
            return
        }

        // Optional: limit file size to 2 MB
        if (file.size > 10 * 1024 * 1024) {
            alert('Image size must be less than 2 MB.')
            event.target.value = ''
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            userDraft.value = {
                ...userDraft.value,
                profileImage: reader.result
            }

        }

        reader.onerror = () => {
            alert('Failed to read the image.')
        }

        reader.readAsDataURL(file)
    }

    




    return { 
        users, 
        selectedUser,
        userStatus,
        userSearch,
        visibleUsers,
        userDraft,
        isEditMode,
        loading, 
        userModalOpen, 
        fetchUsers, 
        fetchUserRoles,
        userRoles,
        openUserModal,
        saveUser,
        deleteUser,
        handleImageUpload,
        removeProfileImage
    }
})