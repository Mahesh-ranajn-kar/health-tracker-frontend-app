<template>
  <section>
    <div class="page-heading page-toolbar">
      <div>
        <h2>User Directory</h2>
        <p>
          Manage profiles, check activity counts, and inspect individual
          metrics.
        </p>
      </div>
      <a-button type="primary" @click="openUserModal()"><i class="fa-solid fa-user-plus button-icon" />Add New
        User</a-button>
    </div>

    <a-card :bordered="false" class="filter-card">
      <a-row :gutter="12" align="middle">

        <a-col :xs="24" :sm="16" :md="10">
          <a-input v-model:value="userSearch" allow-clear placeholder="Search users by name or email">
            <template #prefix><i class="fa-solid fa-magnifying-glass" /></template>
          </a-input>
        </a-col>

        <a-col :xs="24" :sm="8" :md="6">
          <a-select v-model:value="userStatus" style="width: 100%">
            <a-select-option value="all">All Statuses</a-select-option>
            <a-select-option value="active">Active</a-select-option>
            <a-select-option value="inactive">Inactive</a-select-option></a-select>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false" class="table-card">
      <a-table :columns="columns" :data-source="visibleUsers" :loading="loading" :row-key="(record) => record.id"
        :pagination="{ pageSize: 8, showSizeChanger: true }" :scroll="{ x: 760 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <a-space>
              <a-avatar :src="record.profileImage || record.avatar" :size="42">{{ record.name?.charAt(0) }}</a-avatar>
              <span class="user-cell"><strong>{{ record.name }}</strong><small>{{ record.email }}</small></span>
            </a-space>
          </template>
          <template v-else-if="column.key === 'role'"><a-tag>{{ record.roleName }}</a-tag></template>
          <template v-else-if="column.key === 'status'"><a-tag :color="record.status?.toLowerCase() === 'active'
            ? 'success'
            : 'default'
            ">{{ record.status }}</a-tag></template>
          <template v-else-if="column.key === 'actions'">

            <a-space>
              <!-- Inspect -->
              <a-tooltip title="Inspect User">
                <a-button size="small" type="primary" ghost @click="selectedUser = record">
                  <i class="fa-solid fa-magnifying-glass" />
                </a-button>
              </a-tooltip>

              <!-- Edit -->
              <a-tooltip title="Edit User">
                <a-button size="small" style="color: #fa8c16; border-color: #fa8c16;" @click="openUserModal(record)">
                  <i class="fa-solid fa-pen-to-square" />
                </a-button>
              </a-tooltip>

              <!-- Delete -->
              <a-popconfirm title="Delete this user?" ok-text="Delete" cancel-text="Cancel"
                @confirm="deleteUser(record.id)">
                <a-tooltip title="Delete User">
                  <a-button size="small" danger>
                    <i class="fa-solid fa-trash-can" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
            </a-space>

          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:open="inspectOpen" title="User Details" :footer="null" width="620px">
      <template v-if="selectedUser">
        <a-space align="center" size="middle" class="inspect-header">
          <a-avatar :src="selectedUser.profileImage || selectedUser.avatar" :size="64">{{ selectedUser.name?.charAt(0)
          }}</a-avatar>
          <div>
            <h3>{{ selectedUser.name }}</h3>
            <span>{{ selectedUser.email }}</span>
          </div>
        </a-space>
        <a-row :gutter="12" class="inspect-stats">
          <a-col :span="8"><a-statistic title="Status" :value="selectedUser.status" /></a-col>
          <a-col :span="8"><a-statistic title="Role" :value="selectedUser.roleName" /></a-col>
          <a-col :span="8"><a-statistic title="Activities" :value="selectedUser.activitiesCount" /></a-col>
        </a-row>
        <a-divider orientation="left">Recent Activities</a-divider>
        <a-list :data-source="activities.filter((item) => item.user === selectedUser.name)"
          :locale="{ emptyText: 'No recent activities' }">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :title="item.title" :description="`${item.user} · ${item.category}`" />
              <template #actions><span>{{ item.time }}</span></template>
            </a-list-item>
          </template>
        </a-list>
      </template>
    </a-modal>

    <a-modal v-model:open="userModalOpen" :title="userModelTitle" :footer="null" :destroy-on-close="false"
      width="620px">
      <a-spin :spinning="loading">
        <a-form layout="vertical" :model="userDraft" @finish="saveUser">
          <a-row :gutter="16">
            <a-col :xs="24" :md="12">
              <a-form-item label="User Name" required>
                <a-input v-model:value="userDraft.name" placeholder="e.g. John Doe" />
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="12">
              <a-form-item label="Email Address" required>
                <a-input v-model:value="userDraft.email" type="email" placeholder="john@example.com"
                  :disabled="isEditMode" />
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="12">
              <a-form-item label="Role">
                <a-select v-model:value="userDraft.roleId" placeholder="Select role">
                  <a-select-option v-for="role in userRoles" :key="role.id" :value="role.id">{{ role.name
                    }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="12">
              <a-form-item label="Account Status">
                <a-switch v-model:checked="userDraft.isActive" checked-children="Active" un-checked-children="Inactive" />
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="12">
              <a-form-item label="Password" :required="!userDraft.id">
                <a-input-password v-model:value="userDraft.password" :placeholder="userDraft.id
                  ? 'Leave blank to keep current password'
                  : 'Enter a password'
                  " />
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="12">
              <a-form-item label="Confirm Password" :required="!userDraft.id">
                <a-input-password v-model:value="userDraft.confirmPassword" placeholder="Confirm password" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation="left">Profile Image</a-divider>
          <div class="image-upload-row">
            <div class="upload-panel">
              <a-upload :show-upload-list="false" accept="image/*" :before-upload="beforeImageUpload">
                <a-button><i class="fa-solid fa-cloud-arrow-up button-icon" />Choose
                  Image</a-button> </a-upload><small>PNG or JPG, maximum 2 MB</small>
            </div>
            <div class="image-preview">
              <a-avatar v-if="userDraft.profileImage" :src="userDraft.profileImage" :size="104" />
              <a-avatar v-else :size="104"><i class="fa-regular fa-image" /></a-avatar>
              <a-button v-if="userDraft.profileImage" danger type="text" shape="circle" title="Remove image"
                @click="removeProfileImage">
                <i class="fa-solid fa-trash" />
              </a-button>
            </div>
          </div>
          <div class="modal-actions">
            <a-button @click="userModalOpen = false">Cancel</a-button>
            <a-button type="primary" html-type="submit">{{ userModalSaveBtn }}</a-button>
          </div>
        </a-form>
      </a-spin>
    </a-modal>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";
import { usePulseStore } from "../../stores/pulse.js";
import { useUserStore } from "./user.store.js";

const userStore = useUserStore();
const {
  fetchUsers,
  fetchUserRoles,
  openUserModal,
  saveUser,
  deleteUser,
  removeProfileImage,
} = userStore;
const { userSearch, userDraft, userModalOpen, userRoles, loading, isEditMode, selectedUser, userStatus, visibleUsers } = storeToRefs(userStore);

const pulseStore = usePulseStore();
const { activities } = storeToRefs(pulseStore);
import "./styles.css"

const userModelTitle = isEditMode ? "Edit User" : "Create New User";
const userModalSaveBtn = isEditMode ? "Save Changes" : "Create User";

console.log("visibleUsers ", visibleUsers)

const inspectOpen = computed({
  get: () => Boolean(selectedUser.value),
  set: (value) => {
    if (!value) selectedUser.value = null;
  },
});

const columns = [
  { title: "User", key: "user", dataIndex: "name" },
  { title: "Role", key: "role", dataIndex: "roleName", width: 130 },
  { title: "Status", key: "status", dataIndex: "status", width: 120 },
  {
    title: "Total Activities",
    dataIndex: "activitiesCount",
    key: "activitiesCount",
    width: 140,
  },
  { title: "Actions", key: "actions", width: 180, fixed: "right" },
];

function beforeImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    message.error("Please select a valid image.");
    return false;
  }
  if (file.size > 2 * 1024 * 1024) {
    message.error("Image size must be less than 2 MB.");
    return false;
  }
  const reader = new FileReader();
  reader.onload = () => {
    userDraft.value.profileImage = reader.result;
  };
  reader.onerror = () => message.error("Failed to read the image.");
  reader.readAsDataURL(file);
  return false;
}

onMounted(() => {
  fetchUsers();
  fetchUserRoles();
});

</script>

<!-- <style scoped>
.page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.filter-card,
.table-card {
  margin-bottom: 16px;
}

.user-cell {
  display: flex;
  flex-direction: column;
}

.user-cell small {
  color: var(--pt-muted);
}

.inspect-header {
  margin: 8px 0 22px;
}

.inspect-header h3 {
  margin: 0 0 4px;
}

.inspect-header span {
  color: var(--pt-muted);
}

.inspect-stats {
  padding: 16px 0;
  background: var(--pt-page);
  border-radius: 10px;
}

.image-upload-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
}

.upload-panel,
.image-preview {
  min-height: 132px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed var(--pt-border);
  border-radius: 10px;
  padding: 14px;
}

.upload-panel small {
  color: var(--pt-muted);
}

.image-preview {
  position: relative;
  border-style: solid;
}

.image-preview :deep(.ant-btn) {
  position: absolute;
  top: 5px;
  right: 5px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}

.button-icon {
  margin-right: 8px;
}

@media (max-width: 560px) {
  .page-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .image-upload-row {
    grid-template-columns: 1fr;
  }
}
</style> -->
