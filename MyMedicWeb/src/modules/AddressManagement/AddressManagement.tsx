import { useEffect, useState } from "react";
import "./AddressManagement.css";

type Address = {
    city: string;
    street: string;
    house: string;
    number: string;
};
const defaultAddresses: Record<string, Address> = {
    home: {
        city: "Бишкек",
        street: "Алматинка",
        house: "8",
        number: "27",
    },
    work: {
        city: "Бишкек",
        street: "Манаса",
        house: "15",
        number: "101",
    },
    parents: {
        city: "ОШ",
        street: "Абдырахманова",
        house: "22",
        number: "5",
    },
};

export const AddressManagement = () => {
    const [selectedDefault, setSelectedDefault] = useState<string | null>(null);
    useEffect(() => {
        const savedDefault = localStorage.getItem("defaultAddress");
        if (savedDefault) {
            setSelectedDefault(savedDefault);
        }
    }, []);
    const handleSetDefault = (key: string) => {
        setSelectedDefault(key);
        localStorage.setItem("defaultAddress", key);
    };

    return (
        <div className="addressContainerUser">
            {Object.entries(defaultAddresses).map(([key, address]) => (
                <div key={key} className="addressItem">
                    <h3 className="addressLabel">
                        {key === "home"
                            ? "Домашний адрес"
                            : key === "work"
                            ? "Рабочий адрес"
                            : "Родительский адрес"}
                    </h3>
                    <div className="addressDetails">
                        <p className="addressCity">Город: {address.city}</p>
                        <p className="addressStreet">Улица: {address.street}</p>
                        <p className="addressHouse">Дом: {address.house}</p>
                        <p className="addressNumber">
                            Квартира: {address.number}
                        </p>
                    </div>
                    <div className="checkboxDiv">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedDefault === key}
                            onChange={() => handleSetDefault(key)}
                        />
                        <label>cделать этот адрес по умолчанию</label>
                    </div>
                </div>
            ))}
        </div>
    );
};
