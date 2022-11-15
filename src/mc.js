import * as minio from "minio";
const mc = new minio.Client(

    {
        endPoint: "localhost",
        useSSL: false,
        port: 9000,
        accessKey: "gibson",
        secretKey: "gibson627414joseph"
    }
);


export default mc