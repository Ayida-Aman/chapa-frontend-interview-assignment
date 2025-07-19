'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import styles from './pageStyle.module.css';

export default function Home() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push('/login');
    } else {
      router.push(`/dashboard/${role.toLowerCase().replace(' ', '-')}`);
    }
  }, [role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className={`${styles.homeTerminal} flex items-center justify-center align-middle`}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalTitle}>Status</div>
          <div className={styles.terminalControls}>
            <div className={`${styles.control} ${styles.close}`}></div>
            <div className={`${styles.control} ${styles.minimize}`}></div>
            <div className={`${styles.control} ${styles.maximize}`}></div>
          </div>
        </div>
        <div className={styles.text}>Redirecting...</div>
      </div>
    </div>
  );
}