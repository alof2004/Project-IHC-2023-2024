// Filename - components/Footer.tsx

import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./footercomponents";

const Footer: React.FC = () => {
	return (
		<Box>
			<h1
				style={{
					color: "#FF7A41",
					textAlign: "center",
					marginTop: "20px",
					marginBottom: "20px",
				}}
			>
				Facilitamos a sua vida
			</h1>
			<FooterContainer>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">
							Story
						</FooterLink>
						<FooterLink href="#">
							Clients
						</FooterLink>
						<FooterLink href="#">
							Help
						</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">
							Marketing
						</FooterLink>
						<FooterLink href="#">
							Consulting
						</FooterLink>
						<FooterLink href="#">
							Rent
						</FooterLink>
						<FooterLink href="#">
							Sales
						</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">
							Telefone
						</FooterLink>
						<FooterLink href="#">
							Email
						</FooterLink>
						<FooterLink href="#">
							Formulario
						</FooterLink>
						<FooterLink href="#">
							Chat
						</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="#">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Facebook
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Instagram
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-twitter">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Twitter
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-youtube">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Youtube
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};

export default Footer;
