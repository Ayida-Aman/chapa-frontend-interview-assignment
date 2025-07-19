# 🧾 Chapa Dashboard

A modern, responsive dashboard application built for the **Chapa Frontend Developer Test Task**. It features three role-based dashboards (User, Admin, and Super Admin), mock data management, and a dark fintech aesthetic inspired by platforms like **PayPal** and **PayStack**. Styled with **DaisyUI’s forest theme** and enhanced by **UIverse.io** components for a polished user experience.

---

## ✨ Features

### 👤 User Dashboard (`/dashboard/user`)
- Displays user-specific data (e.g., payment history).
- Accessible to users with the `"User"` role.
- Responsive card-based layout.

---

### 🛠 Admin Dashboard (`/dashboard/admin`)
- **User List**: Table showing ID, Name, Email, Status, and Total Payments.
- **User Payment Summary**: Aggregated total payment data.
- Accessible to `"Admin"` role users.
- Responsive layout:
  - Side-by-side components on medium+ screens (`≥768px`).
  - Vertically stacked on smaller screens.

---

### 🔐 Super Admin Dashboard (`/dashboard/super-admin`)
- All Admin Dashboard features.
- **Admin Management**:
  - Form to add admins (name, email) with validation and toasts.
  - Table to list admins with remove functionality.
  - Static behavior: added admins do not persist; removed ones persist in the session.
- **System Statistics**:
  - Five responsive system stats in a grid layout (`≥640px`, 2 per row).
- Accessible to `"Super Admin"` role users.

---

## 🧑‍🎨 UI Design
- **Theme**: Forest (`data-theme="forest"`) via DaisyUI for dark fintech vibe.
- **Enhanced Components**: Buttons, inputs, animations from UIverse.io.
- **Responsiveness**:
  - Side-by-side components on larger screens.
  - Vertical stacking on smaller devices.
- **Feedback Elements**:
  - `animate-pulse` for loading.
  - `alert-success` and `alert-error` for user notifications.

---

## 🧪 Technologies Used
- **Next.js 14** (App Router, TypeScript)
- **React 18** (`'use client'` components)
- **DaisyUI** (Tailwind CSS component library)
- **Tailwind CSS** (Styling framework)
- **UIverse.io** (Custom animated UI components)
- **Mock API** (setTimeout-based simulation for async behavior)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd chapa-frontend-interview-assignment
```

## 🛠 Install Dependencies

Make sure you have **Node.js v16+** and **npm** installed, then run:

```bash
npm install
```

## 🚀 Run Development Serve

To launch the app locally::

```bash
npm run dev
```
Visit http://localhost:3000 on your browser

## 🔐 Usage

### 🔓 Login

Go to `/login` and select one of the following role:

 Super Admin  
 Admin        
 User         

- ✅ Successful login redirects to your role-specific dashboard.
- ❌ On failure, you'll see an error toast.

---

### 📊 Dashboards Overview

#### 👤 User Dashboard (`/dashboard/user`)
- Displays payment history and personal user data.
- Accessible to users with the `"User"` role.

#### 🛠 Admin Dashboard (`/dashboard/admin`)
- **User List**: Table of users with ID, Name, Email, Status, and Payments.
- **User Payment Summary**: Aggregated payment overview.
- Layout adapts:
  - Medium+ screens (`≥768px`): Components shown side-by-side.
  - Small screens: Vertically stacked layout.

#### 🔐 Super Admin Dashboard (`/dashboard/super-admin`)
- Contains all Admin Dashboard features plus:
  - **SystemStats**: Displays five system metrics in a responsive grid.
  - **Admin Management**:
    - Form to add new admins (with validation and toasts).
    - Static table showing current admins with remove button.
    - Removed admins persist in the session; added ones are not stored.
- Only accessible to the `"Super Admin"` role.

---

## 🗂 Key Files

| Path                                           | Description |
|------------------------------------------------|-------------|
| `app/layout.tsx`                               | Applies `data-theme="forest"` and wraps layout in `AuthProvider`. |
| `lib/context/AuthContext.tsx`                  | Manages login/logout state and role |
| `lib/api.ts`                                   | Contains mocked API functions (`getUsers`, `getAdmins`, etc). |
| `lib/mockData.ts`                              | Mock data for users and admins. |
| `app/(auth)/login/page.tsx`                    | Handles role-based login logic. |
| `app/dashboard/user/page.tsx`                  | User Dashboard UI. |
| `app/dashboard/admin/page.tsx`                 | Admin Dashboard UI with summary and list. |
| `app/dashboard/super-admin/page.tsx`           | Super Admin Dashboard with stats and admin management. |
| `components/super-admin/SystemStats.tsx`       | Displays five key system stats. |
| `components/super-admin/AdminManagement.tsx`   | Admin form and static list with toast notifications. |
