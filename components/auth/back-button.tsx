"use client";
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface BackButtomprops {
    href: string;
    label: string
}

const BackButtom = ({href , label}:BackButtomprops
) => {
  return (
    <Button
    variant="link"
    className='font-normal w-full text-black'
    size='sm'
    asChild
    >
        <Link href={href}>
        {label}</Link>
    </Button>
  )
}

export default BackButtom