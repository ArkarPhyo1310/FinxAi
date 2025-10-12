import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

const CheckboxField = ({ name, label, info, control, required = false, error }: FormCheckboxProps) => {
  return (
    <div className="space-y-2 w-full flex items-start gap-3">
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `Please select ${label.toLowerCase()}` : false }}
        render={({ field }) => (
          <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
        )}
      />
      <div className="grid gap-2">
        <Label htmlFor={name}>{label}</Label>
        <p className="text-muted-foreground text-sm">{info}</p>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    </div>
  );
};

export default CheckboxField;
