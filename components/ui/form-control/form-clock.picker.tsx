import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import {
  IInputFieldProps,
  Input,
  InputField,
  InputIcon,
} from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import {
  AlertCircleIcon,
  EditIcon,
  NotificationLineIcon,
} from "@/components/ui/icon";
import React from "react";

import { FieldPath, FieldValues, Control, Controller } from "react-hook-form";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type IFormClockPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  children?: React.ReactNode;
  formLabelProps?: {
    text: string;
  };
  helperText?: string;
  mode?: "date" | "time" | "datetime" | "countdown";
} & IInputFieldProps;

function FormClockPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  children,
  formLabelProps,
  helperText,
  mode = "time",
  ...rest
}: Readonly<IFormClockPickerProps<TFieldValues, TName>>) {
  const [dateTimePicker, setDateTimePicker] = React.useState({
    isOpen: false,
    date: new Date(),
  });

  const convertToTime = (value: any) => {
    const date = new Date(value);
    let hours: any = date.getHours();
    let minute: any = date.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minute < 10) minute = `0${minute}`;

    return `${hours}:${minute}`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, disabled },
        fieldState,
      }) => (
        <FormControl
          isInvalid={fieldState.invalid}
          size="sm"
          isDisabled={disabled}
          isReadOnly={true}
          isRequired={false}
        >
          <FormControlLabel>
            <FormControlLabelText>
              {formLabelProps?.text ?? name}
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
            <InputField
              {...rest}
              value={convertToTime(
                value ?? dateTimePicker.date.getMilliseconds()
              )}
              onBlur={onBlur}
              onPressIn={() => {
                setDateTimePicker({ ...dateTimePicker, isOpen: true });
              }}
              editable={false}
            />

            <Button
              variant="link"
              action="secondary"
              size="lg"
              onPress={() => {
                setDateTimePicker({ ...dateTimePicker, isOpen: true });
              }}
            >
              <ButtonIcon as={EditIcon} />
            </Button>
            {children}
          </Input>

          {dateTimePicker.isOpen && (
            <RNDateTimePicker
              value={dateTimePicker.date}
              mode={mode}
              onChange={(e) => {
                //timestamp is using type number
                setDateTimePicker({
                  isOpen: false,
                  date: new Date(e.nativeEvent.timestamp),
                });
                onChange(e.nativeEvent.timestamp);
              }}
            />
          )}
          {helperText && (
            <FormControlHelper>
              <FormControlHelperText>{helperText}</FormControlHelperText>
            </FormControlHelper>
          )}
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              {fieldState.error?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
    />
  );
}

export default FormClockPicker;
