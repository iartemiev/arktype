import { motion } from "framer-motion"
import React from "react"

export const Boat = () => (
    <motion.svg
        viewBox="0 0 375 375"
        className="boat"
        initial={{ y: 25, x: "-150px" }}
        animate={{ x: 175 }}
        transition={{ duration: 4.5, delay: 1 }}
    >
        <path
            fill="#2243b6"
            d="M5.314 281.357h27.799l9.62-38.835a5.288 5.337 0 0 1 5.156-4.077h212.609a5.288 5.337 0 0 1 5.156 4.077l9.461 38.3 37.844-4.775c1.754-.268 3.508.43 4.678 1.824 1.169 1.34 1.542 3.218 1.063 4.935l-10.63 37.548a5.295 5.344 0 0 1-5.103 3.916H5.315c-2.923 0-5.316-2.414-5.316-5.364V286.72c0-2.95 2.391-5.364 5.315-5.364Zm127.566-32.184H52.035l-7.972 32.184h88.817zm31.89 0h-21.26v32.184h21.26zm91.582 0h-80.95v32.184h88.923zM10.63 313.542h288.35l7.283-25.855-34.55 4.344c-.212.054-.425.054-.637.054H10.629v21.457z"
        />
        <path
            fill="#2243b6"
            d="M106.994 267.84a5.281 5.33 0 0 0 4.624 2.789c.904 0 1.754-.215 2.604-.697a5.358 5.358 0 0 0 2.073-7.296c-1.435-2.574-4.624-3.54-7.229-2.092-2.55 1.449-3.507 4.72-2.072 7.296zm-43.212-2.575c0 2.95 2.338 5.364 5.262 5.364h.052c2.924 0 5.316-2.414 5.316-5.364 0-2.95-2.392-5.364-5.316-5.364-2.923 0-5.314 2.413-5.314 5.364zm127.671.805c.425 2.628 2.658 4.56 5.262 4.56.266 0 .531 0 .797-.054 2.87-.43 4.943-3.165 4.465-6.115-.426-2.95-3.083-4.989-6.006-4.506h-.053c-2.87.428-4.89 3.165-4.465 6.114zm21.155-.805c0 2.95 2.391 5.364 5.315 5.364 2.924 0 5.369-2.414 5.369-5.364 0-2.95-2.392-5.364-5.316-5.364h-.053c-2.923 0-5.315 2.413-5.315 5.364zm-127.566 0c0 2.95 2.339 5.364 5.262 5.364h.053c2.923 0 5.316-2.414 5.316-5.364 0-2.95-2.392-5.364-5.316-5.364s-5.315 2.413-5.315 5.364zm152.866 5.203a5.232 5.28 0 0 0 1.276.161 5.284 5.284 0 0 0 5.156-4.077c.744-2.843-.957-5.793-3.827-6.49h-.053c-2.87-.698-5.74 1.018-6.432 3.916a5.39 5.39 0 0 0 3.88 6.49z"
        />
        <path
            fill="none"
            d="M182.736 249.173h73.616l6.644 26.82h-80.26Zm55.172 21.295a5.232 5.28 0 0 0 1.276.161 5.284 5.284 0 0 0 5.156-4.077c.744-2.843-.957-5.793-3.827-6.49h-.053c-2.87-.698-5.74 1.018-6.432 3.916a5.39 5.39 0 0 0 3.88 6.49zm-19.985.161c2.923 0 5.369-2.414 5.369-5.364 0-2.95-2.392-5.364-5.316-5.364h-.053c-2.923 0-5.315 2.413-5.315 5.364 0 2.95 2.392 5.364 5.315 5.364zm-21.208 0c.266 0 .532 0 .798-.053 2.87-.43 4.943-3.165 4.464-6.115-.425-2.95-3.082-4.989-6.006-4.506h-.053c-2.87.43-4.89 3.165-4.464 6.115.424 2.627 2.657 4.56 5.262 4.56z"
        />
        <path
            fill="none"
            d="M182.736 249.173v26.82h80.26l1.329 5.364H175.4v-32.184zM164.77 249.173h-13.925v26.82h13.925z"
        />
        <path
            fill="none"
            d="M150.845 249.173v26.82h13.925v5.364h-21.26v-32.184zM58.04 249.173h74.84v26.82H51.397Zm48.954 18.667a5.281 5.33 0 0 0 4.624 2.789c.904 0 1.754-.215 2.604-.697a5.358 5.358 0 0 0 2.073-7.296c-1.435-2.574-4.624-3.54-7.229-2.092-2.55 1.449-3.507 4.72-2.072 7.296zm-16.69 2.79h.053c2.923 0 5.316-2.415 5.316-5.365s-2.392-5.364-5.316-5.364-5.315 2.413-5.315 5.364c0 2.95 2.34 5.364 5.262 5.364zm-21.26 0h.052c2.924 0 5.316-2.415 5.316-5.365s-2.392-5.364-5.316-5.364c-2.923 0-5.315 2.413-5.315 5.364 0 2.95 2.34 5.364 5.262 5.364z"
        />
        <path
            fill="none"
            d="M52.035 249.173h6.006l-6.644 26.82h81.483v5.364H44.062ZM17.964 292.085h253.111c.213 0 .426 0 .638-.053l34.55-4.345-5.773 20.49H17.964Z"
        />
        <path
            fill="none"
            d="m300.49 308.178-1.51 5.364zM17.964 292.085v16.093H300.49l-1.51 5.364H10.63v-21.457z"
        />
        <path
            fill="#8d6e63"
            d="M10.934 302.813v-10.728l131.358.01 131.358.01 15.636-1.955c8.6-1.076 15.786-1.805 15.968-1.621.182.184-1.236 5.887-3.152 12.674l-3.485 12.34H10.934Z"
        />
        <path
            fill="#ffc40c"
            d="M11.237 302.813v-10.728l132.573-.01 132.573-.01 12.453-1.519c14.274-1.741 15.793-1.814 15.794-.759 0 .422-1.407 5.939-3.128 12.26l-3.13 11.495H11.238Z"
        />
        <path
            fill="red"
            d="M44.664 280.591c.009-.253 1.734-7.356 3.834-15.785l3.817-15.326 40.205-.157 40.205-.158v31.886h-44.04c-24.221 0-44.031-.207-44.021-.46zm28.34-11.294c1.408-1.335 1.898-4.63 1.03-6.916-.493-1.295-3.389-2.786-5.41-2.786-2.105 0-5.147 3.07-5.147 5.194 0 1.889 1.463 4.981 2.569 5.43 2.048.832 5.606.36 6.959-.922zm21.261 0c1.407-1.335 1.898-4.63 1.029-6.916-.493-1.295-3.389-2.786-5.41-2.786-2.105 0-5.147 3.07-5.147 5.194 0 1.889 1.463 4.981 2.569 5.43 2.049.832 5.606.36 6.959-.922zm20.992.12c1.898-1.506 2.42-4.01 1.367-6.554-.942-2.274-2.512-3.268-5.167-3.268-2.42 0-5.46 2.891-5.46 5.194 0 1.889 1.463 4.981 2.57 5.43 1.852.752 5.245.346 6.69-.802zM143.658 265.112v-15.938h20.653V281.05h-20.653z"
        />
        <path
            fill="#c80815"
            d="M175.852 265.112v-15.938H255.987l.6 2.299c.33 1.264 1.993 7.953 3.694 14.865 1.702 6.912 3.237 13.05 3.413 13.64.301 1.015-2.064 1.073-43.761 1.073h-44.08Zm24.73 4.138c1.832-2.02 2.163-3.777 1.165-6.189-1.626-3.926-5.907-4.728-8.933-1.674-1.989 2.007-2.257 4.073-.877 6.765 1.064 2.077 1.647 2.365 4.918 2.429 1.832.036 2.801-.31 3.727-1.33zm21.246 0c1.735-1.934 2.089-3.992 1.098-6.384-1.495-3.61-5.994-4.363-8.852-1.479-1.988 2.007-2.256 4.073-.877 6.765 1.064 2.077 1.647 2.365 4.918 2.429 1.836.036 2.796-.308 3.713-1.33zm21.259.047c1.038-.985 1.406-2.009 1.406-3.917 0-3.434-1.442-5.155-4.685-5.594-2.255-.305-2.757-.131-4.397 1.524-2.067 2.086-2.35 4.117-.954 6.842 1.06 2.067 1.651 2.365 4.833 2.429 1.666.034 2.817-.356 3.797-1.284zM143.658 265.112v-15.938h20.653V281.05h-20.653zM64.844 280.591c-10.775-.094-19.59-.408-19.59-.699 0-.797 7.103-29.51 7.366-29.774.125-.127 18.2-.322 40.166-.434l39.939-.204V281.051l-24.146-.145c-13.28-.079-32.961-.22-43.735-.315Zm7.764-10.585c1.609-.87 2.585-4.818 1.772-7.171-1.21-3.501-6.312-4.384-9.2-1.593-1.966 1.902-2.253 4.697-.776 7.579.84 1.64 1.212 1.808 3.988 1.808 1.684 0 3.58-.28 4.216-.623zm21.26 0c1.61-.87 2.585-4.818 1.772-7.171-1.21-3.501-6.312-4.384-9.2-1.593-1.966 1.902-2.253 4.697-.776 7.579.84 1.64 1.212 1.808 3.988 1.808 1.684 0 3.581-.28 4.216-.623zm21.833-.587c1.661-1.676 2.08-3.852 1.24-6.424-.847-2.588-2.125-3.4-5.354-3.4-4.654 0-7.006 4.654-4.663 9.226.855 1.668 1.184 1.808 4.252 1.808 2.501 0 3.623-.3 4.525-1.21z"
        />
    </motion.svg>
)
