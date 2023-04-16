import { useState } from "react"; 
import { //
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material"; //  import useMediaQuery and useTheme from @mui/material
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state"; //  import setLogin from state
import Dropzone from "react-dropzone"; 
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({ //  import yup from yup and create a schema for the form for registration
  firstName: yup.string().required("required"), 
  lastName: yup.string().required("required"), // validation method that checks if the input is a string and if it is required (not empty)
  email: yup.string().email("invalid email").required("required"), // validation method that checks if the input is a string, if it is an email, and if it is required (not empty)
  password: yup.string().required("required"), 
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({ //  import yup from yup and create a schema for the form for validation
  email: yup.string().email("invalid email").required("required"), 
  password: yup.string().required("required"),
});

const initialValuesRegister = { //  create an object with the initial values for the form registration
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {  //  create an object with the initial values for the form login
  email: "",
  password: "",
};

const Form = () => { 
  const [pageType, setPageType] = useState("login"); //  create a state for the page type (login or register) and set the initial value to login 
  const { palette } = useTheme(); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const isNonMobile = useMediaQuery("(min-width:600px)"); 
  const isLogin = pageType === "login"; //  create a variable for the page type (login or register) and check if it is login 
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => { //  create a function for the registration form that takes the values and the onSubmitProps as parameters 
    // this allows us to send form info with image

    const formData = new FormData(); 
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name); //  append the picture path to the form data

    const savedUserResponse = await fetch( //  fetch the data from the server 
      "http://localhost:3001/auth/register", 
      {
        method: "POST", 
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json(); 
    onSubmitProps.resetForm();

    if (savedUser) { //  if the user is saved, set the login state and navigate to the home page
      setPageType("login"); //  set the page type to login
    }
  };

  const login = async (values, onSubmitProps) => { //  create a function for the login form that takes the values and the onSubmitProps as parameters
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", { //  fetch the data from the server 
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(values), 
    });

    const loggedIn = await loggedInResponse.json(); //  convert the response to json 
    onSubmitProps.resetForm(); //  reset the form 
    if (loggedIn) { //  if the user is logged in, set the login state and navigate to the home page
      dispatch(
        setLogin({
          user: loggedIn.user, //  set the user state
          token: loggedIn.token, //  set the token state
        })
      );
      navigate("/home"); //  navigate to the home page
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => { //  create a function that handles the form submit and takes the values and the onSubmitProps as parameters 
    if (isLogin) await login(values, onSubmitProps); //  if the page type is login, call the login function
    if (isRegister) await register(values, onSubmitProps); //  if the page type is register, call the register function
  };

  return (
    <Formik 
      onSubmit={handleFormSubmit} //  call the handleFormSubmit function when the form is submitted
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} //  set the initial values for the form depending on the page type
      validationSchema={isLogin ? loginSchema : registerSchema} //  set the validation schema for the form depending on the page type
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location" //  add a location field
                  onBlur={handleBlur} 
                  onChange={handleChange}
                  value={values.location} //  set the value of the location field to the location value
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)} //  check if the location field is touched and if there are errors
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;