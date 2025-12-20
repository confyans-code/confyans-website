import { UserDropdown } from "./UserDropdown";

export function AdminHeader() {
    return (
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-end border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-gray-950">
            <UserDropdown />
        </header>
    );
}
