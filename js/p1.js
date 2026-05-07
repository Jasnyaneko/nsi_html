const changepanel = document.querySelector("#change_panel")
const cases = document.querySelectorAll(".cases")
const descritext = document.querySelector("#descritext")
const titretext = document.querySelector("#titretext")

let case_obj;
let descriptions_doc = [
    ["zzz","la journée va etre longue -_- mais bon ça sera toujours mieux que les jours qui suivent","vivevement que je sois rentré pour redormir","le combat sera rude aujourd'hui ...","zzz","zzz","zzz",],
    ["zzz","l'occasion de lire un peu","plus l'energie de lire ,autant prendre le temps de se reveiller","une petite video youtube pour mieux encaisser","zzz","zzz","zzz",],
    ["plus de 7h de sommeil ! c'est pas rien...","comme d'habitude avec jule au fond à voir si l'on fera du C à un moment ;)","un cours comme les autres finalement","un cours comme les autres finalement","un cours comme les autres finalement","un cours comme les autres finalement","zzz","zzz",],
    ["un cours comme les autres finalement","pour l'apprentissage du fonctionnement de la memoire et du stockage ça peut etre interessant","un cours comme les autres finalement","une heure de trou durant laquelle je ferai surement rien","un cours comme les autres finalement","zzz","zzz",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","comme tout les mercredi beaucoup a écrire mais c'est toujours un minimum interessant","un cours comme les autres finalement","un cours comme les autres finalement","zzz","zzz",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","la fatigue se fait ressentir mais bon heureusement il suffit d'écrire et d'écouter","un cours comme les autres finalement","un cours comme les autres finalement","eh bien plus de 9h c'est pas si mal","j'ai bien dormi",],
    ["le choix de la nourriture est pas facile","la famille habite loin il faut bien garder contact","vite que je rentre mange et dorme XD","un cours comme les autres finalement","allons rejoindre mes parents pour bien manger","oh mince il est deja 11h j'aurai pas du dormir si tard","boh c'est le jour de repos y a pas de mal",],
    ["meme si c'est qu'une heure y a toujours moyen d'avancer un peu","j'ai trouvé e que j'ai pu mais on va s'en contenter","plus grand chose dans le frigo il va falloir repartir faire des course","entre la nourriture de super marché et les fast food le choix doit etre fait","un bon plat pour les papilles et le corps","aller un peu d'ordi avant de partir","on va pas se prendre la tete aujourd'hui",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","aller on va se reposer","c'est peut trop spécifique mais je me demande si le traitement d'image est au programme","aller retour au lycée","où est-ce qu'on va marcher aujourd'hui ?","voyons voir si il n'y a pas des gens en ligne",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","zzz","suite a la video de 2b1b sur la convolution ça semble un domaine relativement interessant","une heure avant le cours on peut encore avancer","bon on part de chatelet comme d'habitude","tiens c'est quoi ça les BBS (bulletin board system)",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","mince il faut que je finisse ça pour demain !","un cours comme les autres finalement","un TP pas prise de tete","le tour par le nord ou par le sud de paris ?","ça existe encore !? oh mince ça fait 4h que je revasse",],
    ["un cours comme les autres finalement","un cours comme les autres finalement","pourquoi c'est toujours du français ;-;","un cours comme les autres finalement","on rigole des fois avec noé enfin en restant concentrer sur le TP","petit passage par le 13eme","bon on va faire un nouveau site ou apprendre un nouveau truc",],
    ["voyons voir les messages que mes amis m'ont envoyé dans la journée","voyons voir les messages que mes amis m'ont envoyé dans la journée","enfin on va regarder des vidéos tranquillement","voyons voir les messages que mes amis m'ont envoyé dans la journée","allons rejoindre des amis pour la soirée","et comme d'habitude on termine vers le Luxembourg","aller un peu de personalisation sur linux ça peut pas faire de mal",]
]
//liste des descriptions des matieres repartie en en 12 lignes puis 7 cases


cases.forEach((Case)=>{Case.parentElement.addEventListener("click",() => {
    console.log(Case.innerHTML)
    case_obj = Case
    document.querySelector("#title").value = Case.innerHTML.toString()
    document.querySelector("#desc").value = descriptions_doc[parseInt(Case.parentElement.parentElement.id)-6][parseInt(Case.id)-1] 
    changepanel.style.display = "flex"
    changepanel.style.opacity = "100%"
    //affiche l'interface de modification des cases
})
    Case.parentElement.addEventListener("mouseenter",() => {
        document.querySelector("#describox").style.display = "inherit"
        titretext.innerHTML = Case.innerHTML
        descritext.innerHTML = descriptions_doc[parseInt(Case.parentElement.parentElement.id)-6][parseInt(Case.id)-1]
        //les paragraphes de la #describox recoivent les les valeur du titre et de la description correspondant a la cas survolé par la souris
    })
    Case.parentElement.addEventListener("mouseleave",() => {
        document.querySelector("#describox").style.display = "none"
        //la boite de description disparait
    })
})
document.querySelector("#close_panel").addEventListener("click",() => {
   changepanel.style.opacity = "0%"
   setTimeout(() => {changepanel.style.display = "none"},200) 
})

document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault()
    //empeche le relancement de la page par le formulaire
    let data = new FormData(document.querySelector("#form_panel"))
    //recupere les données du formulaire dans une variable
    case_obj.innerHTML = data.get("titre_case")
    //les FormData ont des commandes spécifique pour en récupérer le contenu dont get 
    // ici on remplace le titre de case_obj par la valeur contenu dans l'emplacement donc le name est egale a "titre_case"
    descriptions_doc[parseInt(case_obj.parentElement.parentElement.id)-6][parseInt(case_obj.id)-1] = data.get("description")
    //on change de la description a l'emplacement de la case dans description_doc
    changepanel.style.opacity = "0%"
   setTimeout(() => {changepanel.style.display = "none"},200) 
   //animation de disparition de l'interface
})
document.body.addEventListener("keydown",(key) => {
    console.log(key)
   if(key.keyCode == 27){
    changepanel.style.opacity = "0%"
   setTimeout(() => {changepanel.style.display = "none"},200)
   //si la touche echape est appuyée la fenetre se ferme 
}})