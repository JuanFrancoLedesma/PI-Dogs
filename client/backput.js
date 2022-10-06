function handleInput(e) {
    setInput(() => {
      return {
        ...input,
        [e.target.name]: e.target.value,
      };
    });
    // console.log(input);
    if (e.target.name === "name")
      e.target.value.length === 0
        ? setError({ ...error, [e.target.name]: "Ingrese nombre" })
        : setError({ ...error, [e.target.name]: undefined });
    setTimeout(() => {
      console.log(input);
      if (e.target.name === "heightm" || e.target.name === "heightM") {
        if (!Number(input.heightm) || !Number(input.heightM))
          setError({ ...error, height: "Ingresa algo pedazo de re cuelueado" });
        else if (Number(input.heightm) === Number(input.heightM))
          setError({
            ...error,
            height: "Las alturas minimas y maximas deben ser diferentes",
          });
        else if (Number(input.heightm) > Number(input.heightM))
          setError({
            ...error,
            height: "La altura minima debe ser menor que la maxima",
          });
        else setError({ ...error, height: undefined });
      }
    }, 1000);
    // setError(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }