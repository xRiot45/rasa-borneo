import React from 'react';

interface StepperProps {
    steps: string[];
    currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep >= stepNumber;

                return (
                    <React.Fragment key={index}>
                        {/* Step Item */}
                        <div className="flex flex-1 items-center gap-4 text-center sm:flex-col">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                                    isActive ? 'border-black bg-black text-white dark:bg-white dark:text-black' : 'border-muted text-muted-foreground'
                                }`}
                            >
                                {stepNumber}
                            </div>
                            <span className={`mt-2 text-sm ${isActive ? 'font-medium text-black dark:text-white' : 'text-muted-foreground'}`}>
                                {label}
                            </span>
                        </div>

                        {/* Connector (kecuali step terakhir) */}
                        {index !== steps.length - 1 && (
                            <div className="bg-muted-foreground ml-[18px] h-10 w-px sm:ml-0 sm:block sm:h-px sm:w-28 sm:self-center"></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;
