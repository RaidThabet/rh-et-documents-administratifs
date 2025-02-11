import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Avatar} from "@heroui/avatar";
import {Alert} from "@heroui/alert";
import {Input} from "@heroui/input";
import {MdEmail} from "react-icons/md";
import {passwordResetSchema, PasswordResetSchema} from "../lib/schema/passwordResetSchema.ts";
import {useSearchParams} from "react-router";

function PasswordResetForm() {
    const [params] = useSearchParams();

    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting, isSubmitSuccessful}} = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        mode: "onTouched"
    });

    const onSubmit = handleSubmit((data) => {
        try {
            console.log(params);
            console.log(data);
        } catch (e) {
            console.log(e);
            setError("root", {
                type: "manual",
                message: "Erreur"
            })
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
                {errors.root &&
                    <Alert variant={'solid'} color={"danger"} title={"Erreur"}/>}
                {isSubmitSuccessful && (
                    <Alert variant={"solid"} color={"success"} title={"Votre mot de passe a été modifié avec succès"} />
                )}
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit} className={"flex flex-col justify-center items-center gap-4 h-full"}>
                    <Input
                        color={errors.newPassword ? "danger" : "default"}
                        startContent={<MdEmail size={20}/>}
                        type={"password"}
                        placeholder={"Entrez votre nouveau mot de passe"}
                        errorMessage={errors.newPassword?.message as string}
                        isInvalid={!!errors.newPassword}
                        size={"md"}
                        {...register("newPassword")}
                    />
                    <Input
                        color={errors.confirmPassword ? "danger" : "default"}
                        startContent={<MdEmail size={20}/>}
                        type={"password"}
                        placeholder={"Confirmez votre nouveau mot de passe"}
                        errorMessage={errors.confirmPassword?.message as string}
                        isInvalid={!!errors.confirmPassword}
                        size={"md"}
                        {...register("confirmPassword")}
                    />
                    <button
                        disabled={!isValid || isSubmitting}
                        type={"submit"}
                        className={"mt-5 rounded-md bg-[#4879f4] disabled:opacity-50 text-white font-semibold py-2 px-4"}
                    >
                        {isSubmitting ? "Connexion..." : "Restaurer"}
                    </button>
                </form>
            </CardBody>
        </Card>
    );
}

export default PasswordResetForm;