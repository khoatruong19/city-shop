import {
  BuildingLibraryIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/solid';
import { Stepper } from '@mantine/core';
import { mainOrangeColor } from '../../utils/constants';

interface IProps {
  activeStep: number;
}

const CheckoutSteps = ({ activeStep }: IProps) => {
  const steps = [
    {
      label: 'Shipping Details',
      completedIcon: <TruckIcon style={{ color: mainOrangeColor }} />,
      icon: (active: boolean) => (
        <TruckIcon style={{ color: active ? mainOrangeColor : 'gray' }} />
      ),
    },
    {
      label: 'Confirm Order',
      completedIcon: (
        <ClipboardDocumentCheckIcon style={{ color: mainOrangeColor }} />
      ),

      icon: (active: boolean) => (
        <ClipboardDocumentCheckIcon
          style={{ color: active ? mainOrangeColor : 'gray' }}
        />
      ),
    },
    {
      label: 'Payment',
      completedIcon: <BuildingLibraryIcon style={{ color: mainOrangeColor }} />,

      icon: (active: boolean) => (
        <BuildingLibraryIcon
          style={{ color: active ? mainOrangeColor : 'gray' }}
        />
      ),
    },
  ];
  return (
    <Stepper
      sx={{ width: '70vw', margin: '4rem auto 3rem' }}
      active={activeStep}
      breakpoint="sm"
    >
      {steps.map((step, i) => (
        <Stepper.Step
          sx={{
            color: activeStep >= i ? 'black' : 'lightgray',
          }}
          key={i}
          label={step.label}
          icon={step.icon(activeStep === i)}
          completedIcon={step.completedIcon}
        />
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
