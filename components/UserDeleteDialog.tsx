"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogProps } from "@/hooks/useDialog";
import { deleteUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UserDeleteDialog = ({ dialogProps }: { dialogProps: DialogProps }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const confirmDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const result = await deleteUser({ password });
      if (result?.success) {
        router.push("/sign-in");
      } else {
        const description =
          typeof result.error === "string"
            ? result.error
            : result.error instanceof Error
            ? result.error.message
            : "An unexpected error occurred.";
        toast.error("Account delete failed!", { description });
      }
    } catch (e) {
      console.error("Failed to delete account", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog {...dialogProps}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm Account Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-400 text-sm mb-2">
          This action is irreversible. Please enter <strong>your password</strong> to confirm account deletion.
        </p>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <DialogFooter>
          <Button variant="destructive" onClick={confirmDeleteAccount} disabled={isLoading || !password}>
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteDialog;
