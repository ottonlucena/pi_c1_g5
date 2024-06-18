
import React from 'react';
import Styles from './Nosotros.module.css';

const teamMembers = [
    {
        name: 'Elizabeth Castro',
        role: 'CEO',
        image: '../../../public/assets/Elizabeth.jpg'
    },
    {
        name: 'Lenin Uzcategui',
        role: 'CTO',
        image: '../../../public/assets/Lenin.jpg'
    },
    {
        name: 'Juan Manuel Herrero',
        role: 'Desarrollador',
        image: '../../../public/assets/juanma.jpg'
    },
    {
        name: 'Otton Lucena',
        role: 'Diseñadora',
        image: '../../../public/assets/Otton.jpg'
    },
    {
        name: 'Jorge Alfaro',
        role: 'Marketing',
        image: '../../../public/assets/jorge.jpg'
    },
    {
        name: 'Emiliano Nakayama',
        role: 'Tester',
        image: '../../../public/assets/emi.jpg'
    }
];

const Nosotros = () => {
    return (
        <div className={Styles.nosotros}>
            <h1>Somos un gran equipo</h1>
            <div className="team-container">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <img src={member.image} alt={member.name} className={Styles.memberPhoto} />
                        <h2>{member.name}</h2>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nosotros;
