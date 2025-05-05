import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Avatar} from "@heroui/avatar";
import {Input} from "@heroui/input";
import {passwordResetSchema, PasswordResetSchema} from "../../lib/schema/passwordResetSchema.ts";
import {Link, useNavigate, useSearchParams} from "react-router";
import {RiLockPasswordFill} from "react-icons/ri";
import {resetPassword} from "../../actions/authActions.ts";
import {checkResetParams} from "../../util/auth.ts";
import {useEffect} from "react";
import {addToast} from "@heroui/toast";

function PasswordResetForm() {
    const [params] = useSearchParams();
    const token = params.get("token") as string;
    const userId = params.get("id") as string;

    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        mode: "onTouched"
    });

    const onSubmit = handleSubmit(async(data) => {
        try {
            const reqData = {token: params.get("token") as string, userId: params.get("id") as string, password: data.newPassword}
            await resetPassword(reqData);
            addToast({
                title: "Votre mot de passe a été modifié avec succès",
                color: "success",
                variant: "solid"
            });
        } catch (e) {
            console.log(e);
            setError("root", {
                type: "manual",
                message: "Erreur"
            });
            addToast({
                title: e.message || "Une erreur est survenue",
                color: "danger",
                variant: "solid"
            });
        }
    })

    useEffect(() => {
        checkResetParams(token, userId)
            .then(res => {
                if (!res.isCorrect) {
                    navigate("/login")
                }
                return;
            })
            .catch(e => console.log(e))

    }, [navigate, params, token, userId]);

    return (
        <Card className={"px-4 w-3/12"}>
            <CardHeader className={"flex flex-col justify-start items-center gap-2"}>
                <Avatar size={"lg"} src={"/images/logo_isimm.png"}/>
                <p className={"text-2xl font-bold text-center"}>Restauration du mot de passe</p>
                <p className={"text-md text-center font-semibold"}>
                    Veuillez saisir votre nouveau mot de passe pour poursuivre le processus de restauration.
                </p>
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit} className={"flex flex-col justify-center items-center gap-4 h-full"}>
                    <Input
                        color={errors.newPassword ? "danger" : "default"}
                        startContent={<RiLockPasswordFill size={20}/>}
                        type={"password"}
                        placeholder={"Entrez votre nouveau mot de passe"}
                        errorMessage={errors.newPassword?.message as string}
                        isInvalid={!!errors.newPassword}
                        size={"md"}
                        {...register("newPassword")}
                    />
                    <Input
                        color={errors.confirmPassword ? "danger" : "default"}
                        startContent={<RiLockPasswordFill size={20}/>}
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
                    <button className={"text-sm"}><Link to={"/login"}>Retourner au login</Link></button>
                </form>
            </CardBody>
        </Card>
    );
}

export default PasswordResetForm;