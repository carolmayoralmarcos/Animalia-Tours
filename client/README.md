# AnimaliaTours-client

## MVP

### Mónica

- [x] 1. Hero (carrusel)
- [x] 2. hook getrandomactivities
- [x] 3. cart (cartContext)
- [x] 4. Login
- [x] 5. UpdateActivity: updated due to new utils getElementbyId and new route
- [x] 6. Revisar Añadir Mascota (addPet)
- [x] 7. Revisar Eliminar Mascota (deletePet)
- [x] 8. Página Carrito
- [x] 9. Cart endpoint newReservation (button reservation confirmed and create new reservation). id=local storage
- [x] 9. Home Carrusel: Not random. Yes 3 fixed images
- [x] 10. Cart: GetProfile to be used instead of User Context (decode) to get userId from token
- [x] 11. Link New Pet with user
- [x] 12. Cart control: Cart button "Confirmar reserva" only when user is logged in. If not, link to Login.
- [x] 13. PopUp en Español
- [x] 14. Activity Format and Navigate to vew details

quick quentions

- [x] 1. I have removed the name of the reservations model, but the database still keeps historical information.
- [DISEÑO] 3. The quantity in the cart no longer increases (=1) when clicking multiple times on "add activity," . Decide whether we should remove the control.
- [x] 4. AddPets -> The view element is not working. Please let me know if I need to check this myself: http://localhost:3000/view/pets/66d44fb0d334e697d028ca21 error
- [CAROL] 6. In the profile, I don't see the option to edit pets to view the data and modify it if necessary.

### Daniela

1. pagina activities
2. pagina About
3. Register(Con Ale)
4. Contact (Con Ale)
5. En Actividades un botón "Añadir al carrito" -> utilizar context link, añadir el boton modificar linkado updateactivities
6. colores para el cssgris claro: #f0f0f0 , beige suave: #f5e8e8

### Aleida

1. Home
2. Footer(Con Daniela)
3. Header(Con Daniela)
4. Navbar(Con Daniela)

### Carolina

1. En utils recoger actividad por ID
2. crear y hacer pagina ver actividad por id
3. UserProfile
4. NewActivity (añadir imagen) -> NO usar JSON, usar Form
5. Dentro del UserProfile -> Bloque de Reservas (usar endpoint getReservationsbyUserId)

- [ ] 6. NewActivity tiene que mostrar la lista de ciudades para elegir en un dropdown en vez de tener que meter el ID a mano.

### Haritz

- [x] 1. SearchBar
- [x] 2. useRedirection
- [x] 3. Router
- [x] 4. PrivateRoute
- [x] 5. Cities (con Carol)
- [x] 6. deleteElement
- [x] 7. Button component
- [x] 8. NewCity
- [x] 9. UpdateCity
- [x] 10. Logout
- [x] 11. ViewElement with Carrito feature
- [x] 12. List of Activities in ViewCity
- [x] 13. ViewElement also for pets and Reservations

## BUGFIXES AND IMPROVEMENTS

- [x] 1. Profile crashes the server app if no user logged.
- [DISEÑO] 2. Register should not be a separate option in the Header. It should be an internal link from Login.
- [x] 3. "Ver Detalle" in ViewVity crashes. We need 2 separate files for clean workaround.
- [x] 4. AddPet needs to create link between the new created pet and the user making that action.
- [CAROL] 5. deletePet needs to show a confirmation pop-up prior to deletion.
- [IF DISEÑO] 6. Show only Login when no token. Show only Profile when token.
- [IF DISEÑO] 7. Show Logout icon at right end only when user is logged.
- [x] 8. Cart button "Confirmar reserva" only when user is logged in. If not, link to Login.
- [DISEÑO] 9. Cart icon near to Logout at right end instead of main NavBar?
- [CAROL] 10. User should be able to cancel a Reservation in his profile page. Confirmation pop-up needed.
- [CAROL] 11. User should be able to change his user information (name, email and password) in his profile page. Confirmation pop-up needed.
- [x] 12. City images are not being deleted when city is deleted.
- [x] 13. Home responsive
- [x] 14. New Activity: Error of Name and Descritpion in Mongo Db and Error in number of maximum clients
- [x] 15. Create and Update Activity Navigate to vew details
- [x] 16. Format Activity Create vs Modify

## EXTRAS

- [ ] 1. Buttons for Activity or City creation / modifying / deletion should appear only if user is admin / provider.
- [ ] 2. Admin Dashboard is showed when token role is 'admin'. Here every user is shown and deletion allowed after pop-up confirmation.
- [ ] 3. Admin Dashboard could show every Reservation and change any of them.
- [ ] 4. Pets collection should allow to add image, genre and description.
