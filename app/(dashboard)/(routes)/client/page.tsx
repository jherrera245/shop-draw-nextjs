import {auth, currentUser } from "@clerk/nextjs";

const ClientPage = async () => {
    const user = await currentUser();
    return (
        <div>
            <h1>Bienvenido, { user?.firstName + ' ' + user?.lastName}</h1>
        </div>
    );
}

export default ClientPage;
