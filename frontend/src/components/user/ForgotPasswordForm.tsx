import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {forgotPasswordSchema, ForgotPasswordSchema} from "../../lib/schema/forgotPasswordSchema.ts";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Avatar} from "@heroui/avatar";
import {Alert} from "@heroui/alert";
import {Input} from "@heroui/input";
import {MdEmail} from "react-icons/md";
import {forgotPassword} from "../../actions/authActions.ts";
import {Link} from "react-router";
import {addToast} from "@heroui/toast";

function ForgotPasswordForm() {
    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting, isSubmitSuccessful}} = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onTouched"
    });

    const onSubmit = handleSubmit(async(data) => {
        try {
            await forgotPassword(data);
            addToast({
                title: "Veuillez vérifier votre courrier pour poursuivre le processus de restauration",
                color: "success",
                variant: "solid"
            });
        } catch (e) {
            setError("root", {
                type: "manual",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                message: e.message || "Veuillez vérifier vos coordonnées"
            });
            addToast({
                title: error?.message || e.message || "Veuillez vérifier vos coordonnées",
                color: "danger",
                variant: "solid"
            });
        }
    })

    return (
        <Card className={"px-4 w-3/12"}>
            <CardHeader className={"flex flex-col justify-start items-center gap-2"}>
                <Avatar size={"lg"} src={"/images/logo_isimm.png"}/>
                <p className={"text-2xl font-bold text-center"}>Restauration du mot de passe</p>
                <p className={"text-md text-center font-semibold"}>
                    Veuillez saisir votre email pour poursuivre le processus de restauration de votre mot de passe.
                </p>
                {isSubmitSuccessful && (
                    <Alert variant={"solid"} color={"secondary"} title={"Veuillez vérifier votre courrier pour poursuivre le processus de restauration"} />
                )}
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit} className={"flex flex-col justify-center items-center gap-4 h-full"}>
                    <Input
                        color={errors.email ? "danger" : "default"}
                        startContent={<MdEmail size={20}/>}
                        type={"email"}
                        placeholder={"Entrez votre email"}
                        errorMessage={errors.email?.message as string}
                        isInvalid={!!errors.email}
                        size={"md"}
                        {...register("email")}
                    />
                    <button disabled={!isValid || isSubmitting} type={"submit"}
                            className={"mt-5 rounded-md bg-[#4879f4] disabled:opacity-50 text-white font-semibold py-2 px-4"}>
                        {isSubmitting ? "Connexion..." : "Restaurer"}
                    </button>
                    <button className={"text-sm"}><Link to={"/login"}>Retourner au login</Link></button>
                </form>
            </CardBody>
        </Card>
    );
}

export default ForgotPasswordForm;