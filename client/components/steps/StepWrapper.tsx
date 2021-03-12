import React, {useState} from 'react';
import {Button, Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import styles from '../../styles/StepWrapper.module.sass'


interface StepWrapperProps {
    finalStepAction: () => void
}

const StepWrapper: React.FC<StepWrapperProps> = ({finalStepAction, children}) => {
    const [activeStep, setActiveStep] = useState(0)
    const countStep = React.Children.count(children) - 1

    const next = () => {
        if (activeStep < countStep)
            setActiveStep(prevState => prevState + 1)
        if (activeStep === countStep && !haveError())
            finalStepAction()
    }

    const haveError = () => {
        const array = React.Children.toArray(children)
        for (let i = 0; i < array.length; i++) {
            // @ts-ignore
            if (array[i].props.error) {
                console.log("")
                return true
            }
        }
    }

    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel>
                {React.Children.map(children, (child, index) => {
                    const labelProps = {};
                    // @ts-ignore
                    if (child.props?.error === true && activeStep > index) {
                        // @ts-ignore
                        labelProps.error = true;
                    }
                    return (
                        <Step
                            key={index}
                            completed={activeStep > index}>
                            <StepLabel {...labelProps}>{
                                // @ts-ignore
                                "props" in child ? child.props.title : 'Title'
                            }</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Grid container justifyContent='center'>
                <Card className={styles.card}>
                    {children[activeStep]}
                </Card>
            </Grid>
            <Grid container justifyContent={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>{activeStep === countStep ? "Конец" : 'Вперед'}</Button>
            </Grid>
        </Container>
    );
};

export default StepWrapper;