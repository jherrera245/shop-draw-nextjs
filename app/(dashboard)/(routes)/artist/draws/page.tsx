import { Button } from "@/components/ui/button";
import Link from "next/link";

const DrawsPage = () => {
    return (
        <div className="p-6">
            <Link href="/artist/create">
                <Button> Publicar un dibujo </Button>
            </Link>
        </div>
    );
}

export default DrawsPage;
