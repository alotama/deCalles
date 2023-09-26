"use client"
import React, { ReactNode } from 'react';

interface CardProps {
  as?: keyof JSX.IntrinsicElements; // Esto permite especificar el tipo de elemento, como 'div', 'span', 'article', etc.
  children: ReactNode;
  className?: string;
  // Puedes añadir otras propiedades según tus necesidades.
}

const Card: React.FC<CardProps> = ({
  as: Component = 'article', // 'div' es el valor predeterminado, pero puedes usar cualquier otro elemento HTML válido.
  children,
  className,
  ...props
}) => {
  return (
    <Component className={`max-w-md mx-auto p-4 bg-white shadow-lg rounded-md overflow-hidden ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Card;
