import { IRole } from "@/application/entities";
import { Badge, Flex, Select } from "@radix-ui/themes";
import { FC, useEffect, useMemo } from "react";
import { ICellRendererParams } from 'ag-grid-community';

const RoleBadge: FC<ICellRendererParams> = (props: ICellRendererParams) => {
  const roles = useMemo(() => props.data?.relationships?.roles?.data || [], []) 
  
  return (
    <>
      <Flex gap="2">
        {roles.map((role: IRole) => {
          return <Badge color="gray" className="capitalize" key={role.id}>{role.attributes.name}</Badge>
        })}
      </Flex>
    </>
  );
};
export default RoleBadge;