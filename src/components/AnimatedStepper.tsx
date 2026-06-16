"use client";

import {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Check } from "lucide-react";

export type StepperFooterRenderProps = {
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleComplete: () => void;
};

type StepperProps = {
  children: ReactNode;
  initialStep?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  onBeforeNext?: () => boolean;
  onBeforeComplete?: () => boolean | Promise<boolean>;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  completeButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  disableStepIndicators?: boolean;
  variant?: "default" | "typeform";
  renderFooter?: (props: StepperFooterRenderProps) => ReactNode;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "onStepChange">;

export function AnimatedStepper({
  children,
  initialStep = 1,
  currentStep: controlledStep,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeNext,
  onBeforeComplete,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  completeButtonProps = {},
  backButtonText = "Indietro",
  nextButtonText = "Continua",
  completeButtonText = "Completa",
  disableStepIndicators = false,
  variant = "default",
  renderFooter,
  renderStepIndicator,
  className = "",
  ...rest
}: StepperProps) {
  const [internalStep, setInternalStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const prevControlledRef = useRef(controlledStep ?? initialStep);

  const currentStep = controlledStep ?? internalStep;
  const isControlled = controlledStep !== undefined;

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;
  const isTypeform = variant === "typeform";
  const progress = Math.round((currentStep / totalSteps) * 100);

  useEffect(() => {
    if (!isControlled || controlledStep === undefined) return;
    if (controlledStep !== prevControlledRef.current) {
      setDirection(controlledStep > prevControlledRef.current ? 1 : -1);
      prevControlledRef.current = controlledStep;
    }
  }, [controlledStep, isControlled]);

  const updateStep = (newStep: number) => {
    if (!isControlled) setInternalStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (onBeforeNext && !onBeforeNext()) return;
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    if (onBeforeComplete) {
      const ok = await onBeforeComplete();
      if (!ok) return;
    }
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  const footerProps: StepperFooterRenderProps = {
    currentStep,
    totalSteps,
    isLastStep,
    handleBack,
    handleNext,
    handleComplete,
  };

  return (
    <div className={`w-full ${className}`.trim()} {...rest}>
      <div
        className={`mx-auto w-full overflow-hidden ${
          isTypeform
            ? `rounded-3xl border border-brand-bordo bg-brand-bianco shadow-[0_24px_64px_-20px_rgba(17,17,17,0.12)] ${stepCircleContainerClassName}`
            : `max-w-lg rounded-[2.5rem] border border-brand-bordo bg-brand-bianco shadow-[0_40px_100px_-20px_rgba(17,17,17,0.08)] ${stepCircleContainerClassName}`
        }`}
      >
        {isTypeform ? (
          <div className="px-6 pt-6 pb-2 md:px-8 md:pt-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-brand-grigio mb-2">
              <span>
                Domanda {currentStep} di {totalSteps}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-brand-bordo overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-corallo"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
              />
            </div>
          </div>
        ) : (
          <div className={`flex w-full items-center p-8 pb-4 ${stepContainerClassName}`}>
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;
              return (
                <span key={stepNumber} className="contents">
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: (clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      },
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      onClickStep={(clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1);
                        updateStep(clicked);
                      }}
                    />
                  )}
                  {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                </span>
              );
            })}
          </div>
        )}

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          minContentHeight={isTypeform ? 320 : undefined}
          className={`${isTypeform ? "px-6 md:px-8" : "px-8"} ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted &&
          (renderFooter ? (
            <div className={`px-6 pb-6 pt-2 md:px-8 md:pb-8 ${footerClassName}`}>
              {renderFooter(footerProps)}
            </div>
          ) : (
            <div className={`px-6 pb-6 pt-2 md:px-8 md:pb-8 ${footerClassName}`}>
              <div
                className={`flex items-center gap-4 ${
                  currentStep !== 1 ? "justify-between" : "justify-end"
                }`}
              >
                {currentStep !== 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm font-semibold text-brand-grigio transition-colors hover:text-brand-nero"
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                )}
                <button
                  type="button"
                  onClick={isLastStep ? () => void handleComplete() : handleNext}
                  className="btn-corallo px-8 py-3.5 text-sm md:text-base"
                  {...(isLastStep ? completeButtonProps : nextButtonProps)}
                >
                  {isLastStep ? completeButtonText : nextButtonText}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
  minContentHeight,
}: {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
  minContentHeight?: number;
}) {
  const [parentHeight, setParentHeight] = useState(minContentHeight ?? 0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{
        height: isCompleted ? 0 : Math.max(parentHeight, minContentHeight ?? 0) || "auto",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -24 : 24,
    opacity: 0,
  }),
};

export function Step({
  children,
  title,
  required = true,
}: {
  children: ReactNode;
  title?: string;
  required?: boolean;
}) {
  return (
    <div className="py-4 md:py-6">
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-nero leading-snug mb-6 md:mb-8">
          {title}
          {required && <span className="text-brand-corallo ml-1">*</span>}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.button
      type="button"
      onClick={() => !disableStepIndicators && onClickStep(step)}
      disabled={disableStepIndicators}
      className={`relative flex items-center justify-center ${
        !disableStepIndicators ? "cursor-pointer" : "cursor-default"
      }`}
      animate={status}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "var(--color-brand-panna)",
            color: "var(--color-brand-grigio)",
            borderColor: "var(--color-brand-bordo)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--color-brand-bianco)",
            color: "var(--color-brand-corallo)",
            borderColor: "var(--color-brand-corallo)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--color-brand-corallo)",
            color: "#ffffff",
            borderColor: "var(--color-brand-corallo)",
          },
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors duration-300"
      >
        {status === "complete" ? (
          <Check className="h-5 w-5" aria-hidden />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>

      {status === "active" && (
        <motion.div
          layoutId="forge-stepper-glow"
          className="absolute -inset-1 rounded-full bg-brand-corallo/20 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-brand-bordo">
      <motion.div
        className="absolute inset-0 origin-left bg-brand-corallo"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isComplete ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}

export default AnimatedStepper;
