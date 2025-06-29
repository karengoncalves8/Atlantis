import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;  
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-white flex p-8 flex-col rounded-sm shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1)] ${className}`}
    >
      {children}
    </div>
  );
}
