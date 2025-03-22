import { Button, ButtonIcon } from "@/components/ui/button";

import { VStack } from "@/components/ui/vstack";

import React, { useEffect } from "react";

import { Text } from "@/components/ui/text";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import FormCreateActivity from "@/components/plans/create/form-create-activity";
import FormCreatePiggyBank from "@/components/plans/create/form-create-piggy-bank";
import FormStep1 from "@/components/plans/create/form-step1";
import FormCreateFriends from "@/components/plans/create/form-create-friend";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Redirect, router } from "expo-router";

import CreateDoneScreen from "@/components/plans/create/create-done";

const PlanCreate = () => {
  return <Redirect href={'/plans/create/onboarding-budget'} />;
};

export default PlanCreate;
