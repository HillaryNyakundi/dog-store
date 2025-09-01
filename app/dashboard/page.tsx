import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {session.user.name}!</h1>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Username:</span> {session.user.username}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {session.user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Role:</span> {session.user.role}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">User ID:</span> {session.user.id}
              </p>
            </div>
            
            <form action={async () => {
              'use server';
              const { signOut } = await import('next-auth/react');
              await signOut();
            }}>
              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}