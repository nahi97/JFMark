# JFMark Project

## Project Overview
The JFMark project is a comprehensive solution that includes various documents, templates, and web resources designed to assist businesses in managing their operations efficiently. This repository contains essential templates for financial models, business plans, employment contracts, and a fully functional website template.

## Contents
The project is organized into the following sections:

1. **Documents and Templates**: A collection of essential business documents.
   - `Modèle en blanc annexe financier.xlsx`: Financial annex template.
   - `Modèle en blanc de plan d'affaires.docx`: Business plan template.
   - `Purchase Order.xlsm`: Purchase order template.
   - `STATUTS SARL.docx`: Limited liability company (SARL) statutes.
   - `STATUTS SARLU.docx`: Single-member limited liability company (SARLU) statutes.
   - `contrat_de_travail.doc`: Employment contract template.
   - `contrat_de_travail.docx`: Employment contract template (Docx format).
   - `lettre-offre-emploi.docx`: Job offer letter template.
   - `receipt.docx`: Receipt template.
   - `JFMark website content.docx`: Content for the JFMark website.

2. **Website Template**: A fully functional and responsive website template.
   - `index.html`: Main HTML file.
   - `css/style.css`: Main stylesheet.
   - `img/`: Directory containing images used in the website.
   - `lib/`: Directory containing libraries and plugins used in the website.

## Usage Instructions

### Documents and Templates
- **Financial Models and Business Plans**: Use the provided templates to create financial models and business plans tailored to your business needs. These templates are designed to be comprehensive and customizable.
- **Employment Contracts**: Utilize the employment contract templates to formalize the hiring process within your organization. Both DOC and DOCX formats are available for convenience.
- **Website Content**: The `JFMark website content.docx` file contains the text content intended for the website. Customize it according to your requirements.

### Website Template
1. **Run locally**: The site is plain HTML/CSS/JS with no build step. Open `index.html` directly, or serve the folder (for example `python -m http.server`) and visit `http://localhost:8000`.
2. **Deploy**: The site is published with GitHub Pages; the `CNAME` file points it at `jfmark.com`.
3. **Customization**:
   - Open `index.html` in a text editor and update the content as needed.
   - Modify `css/style.css` to change the styling of the website.
   - Replace the images in the `img/` directory with your own. Keep photos at most ~800px wide, and keep the `width`/`height` attributes in `index.html` in line with the real image size so the layout does not jump while the page loads.
4. **Contact Form**:
   - The form in the footer posts to [FormSubmit](https://formsubmit.co/), which forwards messages to the address in the form's `action` attribute. Validation is done by the browser (`required`, `type="email"`), so no extra script is needed.
5. **Optional sections**: Testimonials, Team, Clients, FAQ and counters are commented out in `index.html`. Their libraries (Owl Carousel, Waypoints/CounterUp, Bootstrap JS) are no longer loaded; the comment above `js/main.js` in `index.html` lists which script each section needs if you re-enable it.

### Project Features
- **Responsive Design**: The website template is fully responsive and adapts to different screen sizes.
- **Interactive Elements**: Includes interactive elements like sliders, lightboxes, and carousels powered by various JavaScript libraries.
- **Comprehensive Documentation**: The provided documents and templates cover essential aspects of business operations, from financial modeling to employment contracts.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any questions or support, please contact [Your Contact Information].

---

Feel free to explore the project files and use them as needed. Your feedback and contributions are highly appreciated to further improve this project.
