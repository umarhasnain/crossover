import ProtectedRoute from "@/components/HOC/ProtectedRoute";

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This page is protected and only accessible if logged in.</p>
      </div>
    </ProtectedRoute>
  );
}
