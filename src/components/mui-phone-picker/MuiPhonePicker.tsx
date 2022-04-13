import React, { useCallback } from "react";
import {
    Autocomplete,
    Box,
    TextField,
    Popper
} from "@mui/material";
import {
    getCountries,
    getPhoneCode,
    AsYouType,
    CountryCode,
    isSupportedCountry,
    parsePhoneNumber,
    isValidPhoneNumber,
    isPossiblePhoneNumber,
    parsePhoneNumberWithError,
    validatePhoneNumberLength,
    formatNumber
} from "libphonenumber-js";
import type { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InputAdornment from '@mui/material/InputAdornment';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import FlagIcon from '@mui/icons-material/Flag';
import { BoxProps } from '@mui/material/Box';
import countries from "i18n-iso-countries";
import english from "i18n-iso-countries/langs/en.json";



countries.registerLocale(english);

let allCountriesObject = countries.getNames("en", { select: "official" });

interface AllCountriesList {
    countryCode?: CountryCode;
    dialCode?: string | number;
    countryFullName?: string;
}

//let international: AllCountriesList = { countryCode: '', countryFullName: allCountriesObject[key], dialCode: getPhoneCode(key as CountryCode) };

let allCountriesNameWithCode: AllCountriesList[] = [];
// let result = Object.keys(allCountriesObject).map((key) => {
//     if (isSupportedCountry(key as CountryCode)) {
//         return { countryCode: key, countryFullName: allCountriesObject[key], dialCode: getPhoneCode(key as CountryCode) } as AllCountriesList
//     }
// });
Object.keys(allCountriesObject).map((key) => {
    if (isSupportedCountry(key as CountryCode)) {
        allCountriesNameWithCode.push({ countryCode: key, countryFullName: allCountriesObject[key], dialCode: getPhoneCode(key as CountryCode) } as AllCountriesList);
    }
});

// console.log(allCountriesNameWithCode, 'result');

// import countries from "i18n-iso-countries";
// import english from "i18n-iso-countries/langs/en.json";
// import hindi from "i18n-iso-countries/langs/hi.json";



// import "./Button.css";



// interface CountryType {
//     code: string;
//     label: string;
//     phone: string;
//     suggested?: boolean;
// }
// countries.registerLocale(hindi);

// let allCountries = countries.getNames('official');




const CustomizedPopper: FC = (props: any) => {
    return <Popper {...props} style={{ width: 350 }} placement="bottom-start" />;
};



function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: '4px',
                m: 0,
                //   bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                //   color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                //   border: '1px solid',
                //   borderColor: (theme) =>
                //     theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                //   borderRadius: 2,
                //   fontSize: '0.875rem',
                //   fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}



const MuiPhonePicker = React.memo(() => {

    // let allCountries = getCountries();
    // let allCountriesWithCode = allCountries.map(country => {
    //     return { countryCode: country, dialCode: getPhoneCode(country) }
    // });

    const [selectedCountry, setSelectedCountry] = React.useState<AllCountriesList>({ countryCode: "AF", countryFullName: "Afghanistan", dialCode: "93" });
    const [numberInput, setNumberInput] = React.useState('');
    const [numberFieldError, setNumberFieldError] = React.useState('');

    const DELAY = 300;
    // const [timerOut, setTimerOut] = React.useState<number>();

    const handelChange = useCallback((event: React.SyntheticEvent, value: AllCountriesList | null) => {
        console.log("handelChange function rerun");
        if (value !== null) {
            setSelectedCountry(value);
        } else {
            setSelectedCountry({})
        }

    }, [selectedCountry]);

    const handelInputNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handelInputNumberChange function rerun");
        let value = event.target.value;
        setNumberInput(value);
        // formatNumber(value)
    }, [numberInput]);


    /* format number with libphone after 300ms if param true*/
    const formatNumber = (number: string) => {
        console.log("check timeout hell")
        // let result = isPossiblePhoneNumber(number);
        // console.log(result, 'result')
        // { defaultCountry?: CountryCode | undefined; defaultCallingCode?: string | undefined; }
        if (selectedCountry.countryCode) {
            let asYouType = new AsYouType({ defaultCountry: selectedCountry.countryCode, defaultCallingCode: selectedCountry.dialCode as string });
            asYouType.input(number);
            let isPossibleNumber = asYouType.isPossible();
            if (isPossibleNumber) {
                let numberInfo = asYouType.getNumber();
                // let { country?, countryCallingCode?, nationalNumber, number } = numberInfo;
                let country = numberInfo?.country as CountryCode;
                let countryCallingCode = numberInfo?.countryCallingCode;
                let nationalNumber = numberInfo?.nationalNumber;
                let number = numberInfo?.number;
                console.log(nationalNumber, number)
                // let isValidatePhoneNumberLength = validatePhoneNumberLength(nationalNumber as string, country);
                // let isValidatePhoneNumberLength = isPossiblePhoneNumber("+918820116233", 'IN');
                // console.log(isValidatePhoneNumberLength, 'isValidatePhoneNumberLength')
                const phoneNumber = parsePhoneNumberWithError(asYouType.getNumberValue() as string, country);
                setNumberInput(phoneNumber.format("NATIONAL", { nationalPrefix: false }));

                setNumberFieldError("");
                // console.log(phoneNumber, 'phoneNumber')
                // let res = formatNumber(nationalNumber as string);
                // console.log(res, 'res')
                // console.log(res, 'res');
                // setNumberInput(value);
                // formatNumber()
            } else {
                if (numberInput !== '') {
                    setNumberFieldError("Please check number is correct !");
                }
            }
            // setNumberInput()
            // let isValid = asYouType.isValid();
            // console.log(asYouType.isPossible(), 'asYouType', number);
        }

    };




    React.useEffect(() => {
        const timerId = setTimeout(() => {
            formatNumber(numberInput);
        }, DELAY);
        return () => {
            clearTimeout(timerId);
        };
    }, [numberInput, selectedCountry]);

    // const handelChange = (event: React.SyntheticEvent, value: AllCountriesList | null) => {
    //     console.log("handelChange function rerun");
    //     if (value !== null) {
    //         setSelectedCountry(value.countryCode)
    //     } else {
    //         setSelectedCountry('')
    //     }
    // };

    // const handelInputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("handelInputNumberChange function rerun");
    //     let value = event.target.value;
    //     setNumberInput(value);
    // };

    console.log("render");



    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                // alignItems: "center",
                p: 0,
                m: 0,
            }}>
            <Item>
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 145 }}
                    options={allCountriesNameWithCode || []}
                    autoHighlight
                    disableClearable
                    clearIcon=""
                    size="small"
                    defaultValue={{ countryCode: "AF", countryFullName: "Afghanistan", dialCode: "93" }}

                    multiple={false}
                    // placement="bottom-start"
                    PopperComponent={CustomizedPopper}
                    onChange={handelChange}
                    getOptionLabel={(option) => option.countryCode + ' (+' + option.dialCode + ')' || ''}
                    renderOption={(props, option, { selected }) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option?.countryCode?.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option?.countryCode?.toLowerCase()}.png 2x`}
                                alt=""
                            />
                            {" " + option.countryFullName} (+{option.dialCode})
                        </Box>
                    )}
                    renderInput={params => {
                        // console.log(params, 'params')
                        return (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Country code"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start">
                                                {selectedCountry ? (
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        src={`https://flagcdn.com/w20/${selectedCountry?.countryCode?.toLowerCase()}.png`}
                                                        srcSet={`https://flagcdn.com/w40/${selectedCountry?.countryCode?.toLowerCase()}.png 2x`}
                                                        alt=""
                                                    />
                                                ) : (<FlagIcon fontSize="small" />)}
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    )
                                }}
                            />
                        );
                    }}
                />
            </Item>
            <Item>
                <TextField size="small" helperText={numberFieldError} error={Boolean(numberFieldError)} autoComplete="new-password" value={numberInput} onChange={handelInputNumberChange} id="phone-text-field" label="Mobile phone number" variant="outlined" />
            </Item>
        </Box>
    );
});

export default MuiPhonePicker;

export const HocMui: FC = () => {
    const [val, setVal] = React.useState('');


    return (
        <div>
            <TextField value={val} onChange={(e) => setVal(e.target.value)}></TextField>
            <MuiPhonePicker />
        </div>
    )
}