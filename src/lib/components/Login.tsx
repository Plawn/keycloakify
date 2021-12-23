import { useConstCallback } from "powerhooks/useConstCallback";
import { memo, useState } from "react";
import { useCssAndCx } from "tss-react";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import { useKcMessage } from "../i18n/useKcMessage";
import type { KcProps } from "./KcProps";
import { Template } from "./Template";

export const Login = memo(({ kcContext, ...props }: { kcContext: KcContextBase.Login } & KcProps) => {
    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;
    const { InputFieldComponent, CheckboxFieldComponent, ButtonComponent } = props;
    const { msg, msgStr } = useKcMessage();

    const { cx } = useCssAndCx();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback(() => (setIsLoginButtonDisabled(true), true));

    return (
        <Template
            {...{ kcContext, ...props }}
            doFetchDefaultThemeResources={true}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            formNode={
                <div id="kc-form" className={cx(realm.password && social.providers !== undefined && props.kcContentWrapperClass)}>
                    <div
                        id="kc-form-wrapper"
                        className={cx(realm.password && social.providers && [props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass])}
                    >
                        {realm.password && (
                            <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                                <div className={cx(props.kcFormGroupClass)}>
                                    <InputFieldComponent
                                        tabIndex={1}
                                        kcProps={props}
                                        disabled={usernameEditDisabled}
                                        autoFocus
                                        autoComplete={!usernameEditDisabled ? "off" : undefined}
                                        name="username"
                                        type="text"
                                        defaultValue={login.username}
                                        label={!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("email")}
                                    />
                                </div>
                                <div className={cx(props.kcFormGroupClass)}>
                                    <InputFieldComponent
                                        tabIndex={2}
                                        kcProps={props}
                                        disabled={usernameEditDisabled}
                                        autoFocus={!usernameEditDisabled}
                                        autoComplete={"off"}
                                        type="password"
                                        name="password"
                                        defaultValue={login.username}
                                        label={msg("password")}
                                    />
                                </div>
                                <div className={cx(props.kcFormGroupClass, props.kcFormSettingClass)}>
                                    <div id="kc-form-options">
                                        {realm.rememberMe && !usernameEditDisabled && (
                                            <div className="checkbox">
                                                <CheckboxFieldComponent
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    tabIndex={3}
                                                    checked={login.rememberMe}
                                                    content={msg("rememberMe")}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className={cx(props.kcFormOptionsWrapperClass)}>
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                    {msg("doForgotPassword")}
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className={cx(props.kcFormGroupClass)}>
                                    <input
                                        type="hidden"
                                        id="id-hidden-input"
                                        name="credentialId"
                                        {...(auth?.selectedCredential !== undefined
                                            ? {
                                                "value": auth.selectedCredential,
                                            }
                                            : {})}
                                    />
                                    <ButtonComponent
                                        kcProps={props}
                                        tabIndex={4}
                                        name="login"
                                        id="kc-login"
                                        value={msgStr("doLogIn")}
                                        disabled={isLoginButtonDisabled}
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                    {realm.password && social.providers !== undefined && (
                        <div id="kc-social-providers" className={cx(props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass)}>
                            <ul
                                className={cx(
                                    props.kcFormSocialAccountListClass,
                                    social.providers.length > 4 && props.kcFormSocialAccountDoubleListClass,
                                )}
                            >
                                {social.providers.map(p => (
                                    <li key={p.providerId} className={cx(props.kcFormSocialAccountListLinkClass)}>
                                        <a href={p.loginUrl} id={`zocial-${p.alias}`} className={cx("zocial", p.providerId)}>
                                            <span>{p.displayName}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            }
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                )
            }
        />
    );
});
