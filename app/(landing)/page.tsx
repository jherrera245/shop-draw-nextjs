"use client"
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Banner } from "./_components/Banner";
import Categorias from "./_components/Categorias";
import Features from "./_components/Features";


const HomePage = () => {
    return (
        <>
            <Banner />

            <div className="container py-16">
                <Features />
            </div>

            <div className="container py-16">
                <Categorias />
            </div>
        </>
    );
};

export default HomePage;