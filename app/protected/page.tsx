import { redirect } from 'next/navigation';

export default async function DashBoard() {
    redirect('/protected/dashboard');
}