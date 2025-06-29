"use client"

import styles from "./header.module.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    
    return(
        <div className="w-full h-[5rem] bg-[#9ADBE8] flex items-center px-16" >
            <Link href="/" className={styles.title}>Atlantis</Link>
            <div className="flex items-center gap-12 mx-auto">
                <Link href="/" className={`${styles.subTitle} ${pathname === '/' ? styles.active : ''}`}> Clientes</Link>
                <Link href="/hospedagens" className={`${styles.subTitle} ${pathname === '/hospedagens' ? styles.active : ''}`}>Hospedagens</Link>
                <Link href="/acomodacoes" className={`${styles.subTitle} ${pathname === '/acomodacoes' ? styles.active : ''}`}>Acomodações</Link>
            </div>
        </div>
    )
}