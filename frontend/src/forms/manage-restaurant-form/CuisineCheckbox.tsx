import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox className="bg-white" checked={field.value.includes(cuisine)} //field.value is any array of all the items that user has selected so far
          onCheckedChange={(checked) => {
            if (checked) { //if checked the check box, then add the cuisine to the field value array 
              field.onChange([...field.value, cuisine]);
            } else { //if not checked the check box, then remove the cuisine to the field value array by filtering
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;