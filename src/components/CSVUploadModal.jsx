import { Alert } from "@aws-amplify/ui-react";
import React, {useState} from "react";
import CSVReader from 'react-csv-reader';
import {CSVLink} from 'react-csv';
import { Modal } from ".";

export default function CSVUploadModal({show, onClose, onSave, validateRow}) {

    const [error, setError] = useState();
    const [errorCSVFile, setErrorCSVFile] = useState();

    return (
        <>
            <Modal
                show={show}
                onClose={onClose}
                title="Upload"
            >
                {error && <Alert variation="error">{error}</Alert>}
                {errorCSVFile && <CSVLink data={errorCSVFile} filename="csvUploadErrors.csv">Download errors</CSVLink>}
                <CSVReader onFileLoaded={(data, fileInfo, originalFile) => {
                    setError(null);
                    setErrorCSVFile(null);

                    if (data.length === 0) {
                        setError("Your CSV is empty");
                        return;
                    }
                    const headers = data[0];
                    const rows = data.slice(1);

                    const objects = rows.map(row => {
                        let column = 0;
                        let object = {};
                        headers.forEach(header => object[header] = row[column++]);

                        return object;
                    });

                    if (validateRow) {
                        const validations = objects.map(o => validateRow(o));
                        const allValid = validations.every(v => v === null);

                        if (!allValid) {
                            objects.forEach((o, i) => o.isValid = validations[i]);
                            setError("CSV failed validation click link below to see what data failed.");
                            setErrorCSVFile(objects);
                            return;
                        }
                    }

                    onSave(objects);
                }}/>
            </Modal>
        </>
    );
}