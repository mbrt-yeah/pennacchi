interface IThrowErrorParameterts {
    class?: string,
    caller: string,
    name: string,
    msg?: string,
};

export const throwError = (params: IThrowErrorParameterts): Error => {
    let nameFinal = "";

    if (params.class)
        nameFinal = `[${params.class}#${params.caller}] ${params.name}`;
    else
        nameFinal = `[${params.class}] ${params.name}`;

    const error = new Error();
    error.name = nameFinal;
    error.message = params.msg;
    return error;
};
