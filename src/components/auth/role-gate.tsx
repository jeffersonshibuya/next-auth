'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allwedRole: UserRole;
}

export const RoleGate = ({ children, allwedRole}: RoleGateProps) => {
  const role = useCurrentRole()

  if(role !== allwedRole) {
    return (
      <FormError message="You do not have permissionto view this content"/>
    )
  }

  return (
    <>{children}</>
  )
}