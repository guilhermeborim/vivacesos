import { useEffect, useState } from "react";
import { CreateNextStepTypeSchema } from "../schemas";

export function useInitialSteps({ step }: CreateNextStepTypeSchema) {
  const [activeTab, setactiveTab] = useState(
    step === "CREATE_CLINIC" ? 1 : step === "LINK_PROFESSIONAL" ? 2 : 3,
  );
  const [progressbarvalue, setprogressbarvalue] = useState(
    step === "CREATE_CLINIC" ? 0 : step === "LINK_PROFESSIONAL" ? 50 : 100,
  );

  useEffect(() => {
    if (step === "CREATE_CLINIC") {
      setactiveTab(1);
      setprogressbarvalue(0);
    } else if (step === "LINK_PROFESSIONAL") {
      setactiveTab(2);
      setprogressbarvalue(50);
    } else if (step === "DONE") {
      setactiveTab(3);
      setprogressbarvalue(100);
    }
  }, [step]);

  return {
    activeTab,
    progressbarvalue,
  };
}
