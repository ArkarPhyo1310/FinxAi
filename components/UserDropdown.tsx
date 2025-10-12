"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/useDialog";
import { signOut } from "@/lib/actions/auth.actions";
import { isUserSubscribe, updateUserSubscription } from "@/lib/actions/user.action";
import { LogOut, MailX, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HomeCombobox from "./HomeCombobox";
import NavItems from "./NavItems";
import UserDeleteDialog from "./UserDeleteDialog";

const UserDropdown = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isSubscribe, setIsSubscribe] = useState(false);
  const userDeleteDialog = useDialog();

  const getSubscription = async () => {
    const result = await isUserSubscribe({ email: user.email });
    if (result.success) setIsSubscribe(result.data!);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const handleSubscription = async () => {
    const status = !isSubscribe;
    const result = await updateUserSubscription({ email: user.email, subscribe: status });
    if (result.success) {
      getSubscription();
      toast(`You have successfully ${status ? "subscribe" : "unsubscribe"} news.`);
    }
  };

  useEffect(() => {
    getSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 text-gray-4">
            <Avatar className="h-8 w-8">
              {/*<AvatarImage src="https://github.com/shadcn.png" />*/}
              <AvatarFallback className="bg-[#37D0EE] text-blue-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-base font-medium text-gray-400">{user.name}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-transparent text-gray-400 glass-effect ">
          <DropdownMenuLabel>
            <div className="flex relative items-start gap-3 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-[#37D0EE] text-blue-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-base font-medium text-gray-400">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-600" />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-gray-100 text-md font-medium !bg-transparent hover:!text-sky-500 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-5 mr-2 sm:block" />
            Sign Out
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSubscription}
            className="text-gray-100 text-md font-medium !bg-transparent hover:!text-sky-500 transition-colors cursor-pointer"
          >
            <MailX className="h-4 w-5 mr-2 sm:block" />
            {isSubscribe ? "Unsubscribe" : "Subscribe"} News
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={userDeleteDialog.trigger}
            className="text-gray-100 text-md font-medium !bg-transparent hover:!text-sky-500 transition-colors cursor-pointer"
          >
            <UserX className="h-4 w-5 mr-2 sm:block" />
            Delete Account
          </DropdownMenuItem>

          <DropdownMenuSeparator className="block bg-gray-600" />
          <nav className="sm:hidden">
            <HomeCombobox />
            <NavItems />
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserDeleteDialog dialogProps={userDeleteDialog.props} />
    </>
  );
};

export default UserDropdown;
