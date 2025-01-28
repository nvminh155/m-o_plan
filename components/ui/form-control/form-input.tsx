import { Button, ButtonText } from "@/components/ui/button";
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
import { IInputFieldProps, Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React from "react";

import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
  Control,
  Controller,
} from "react-hook-form";
import { Text } from "react-native";

type IFormInputProps<
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
} & IInputFieldProps;

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  children,
  formLabelProps,
  helperText,
  keyboardType,
  ...rest
}: Readonly<IFormInputProps<TFieldValues, TName>>) {
  const formatValue = (value: string) => {
    if (keyboardType === "number-pad") return Number(value);

    return value;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <FormControl
          isInvalid={fieldState.invalid}
          size="sm"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel>
            <FormControlLabelText>
              {formLabelProps?.text}
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size={"lg"}>
            <InputField
              {...rest}
              value={String(value ?? "")}
              placeholder={"Trống"}
              keyboardType={keyboardType}
              onChangeText={(text) => {
                onChange(formatValue(text));
              }}
              onBlur={onBlur}
            />
            {children}
          </Input>
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

export default FormInput;
