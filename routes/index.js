const express = require('express'),
  createError = require('http-errors'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  JWT = require('../JWT'),
  UserModel = require('../models/usermodel'),
  NoticiaModel = require('../models/noticiamodel')

router.get('/', function(req, res, next) {
  res.json({ message: 'ok' })
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  UserModel.findOne({ matricula: req.body.matricula }, (err, user) => {
    if (err) return next(createError(500, 'Error en la base de datos'))
    else if (user) {
      user.isValidPassword(req.body.password, isMatch => {
        if (!isMatch) return next(createError(400, 'Bad Credentials'))
        let options = { issuer: JWT.issuer, audience: JWT.audience }
        let payload = {
          matricula: user.matricula,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10
        }
        let token = jwt.sign(payload, JWT.secretOrKey, options)
        return res.json({ message: 'ok', token })
      })
    } else return next(createError(400, 'Bad Credentials'))
  })
})

router.get('/initialize', (req, res, next) => {
  let user = new UserModel({
    matricula: 'Nelson',
    password: 'password',
    picture:
      'https://ggj.s3.amazonaws.com/styles/user_profile_picture_large__wide/user/profile_147.jpg',
    points: 15,
    achievements: [
      {
        title: 'Nuevo aqui',
        description: 'Accede por primera vez'
      }
    ]
  })
  user.save()
  let user2 = new UserModel({
    matricula: 'Fernando',
    password: 'password',
    picture: 'https://i.pinimg.com/originals/4f/e4/cf/4fe4cfa09826d75ce10fa701660a300e.jpg',
    points: 64,
    achievements: [
      {
        title: 'Nuevo aqui',
        description: 'Accede por primera vez'
      },
      {
        title: 'Novato',
        description: 'Participa en una mesa de reciclaje'
      },
      {
        title: 'Novato 2',
        description: 'Participa en por lo menos dos mesas de reciclaje'
      }
    ]
  })
  user2.save()
  let user3 = new UserModel({
    matricula: 'Alan',
    password: 'password',
    picture: 'https://i.ytimg.com/vi/1feZopZgU2w/maxresdefault.jpg',
    points: 40,
    achievements: [
      {
        title: 'Nuevo aqui',
        description: 'Accede por primera vez'
      },
      {
        title: 'Novato',
        description: 'Participa en una mesa de reciclaje'
      }
    ]
  })
  user3.save()
  res.json({ message: 'OK' })

  let noticia1 = new NoticiaModel({
    title: 'Congreso Internacional de Humanidades',
    author: '06 Mayo 2019',
    shortBody: 'Instalaciones de la Facultad de Filosofía y Letras',
    body: 'La Facultad de Filosofía y Letras de la Universidad Autónoma de Nuevo León, en el marco de la conmemoración de la puesta en marcha de sus actividades como institución de educación superior dedicada al desarrollo del conocimiento en el área de las ciencias humanas y de la cultura, y con el propósito poner a la discusión los desarrollos más actuales del conocimiento de los fenómenos y procesos humanísticos y culturales a nivel internacional y propiciar la interlocución que le permita avanzar en la consolidación de sus líneas de generación y aplicación del conocimiento, convoca a los académicos, investigadores, profesores y estudiantes del país y del extranjero al Congreso Internacional de Humanidades: Horizontes y desafíos en la investigación interdisciplinaria, que se llevará a cabo de los días 6 al 8 de mayo de 2019 en las instalaciones de la propia facultad.El propósito del congreso internacional de humanidades es construir un espacio dialógico en el que se discutan tanto los pensamientos clásicos como las nuevas perspectivas y corrientes de pensamiento respecto a las problemáticas del desarrollo social, político y cultural.'
  })
  noticia1.save()
  let noticia2 = new NoticiaModel({
    title: '6to Coloquio Regional Innovaciones en Psicología',
    author: '06 - 08 Mayo 2019',
    shortBody: '6to Coloquio Regional Innovaciones en Psicología\nDoctorado en Psicología con orientación en\nPsicología Clínica\nPsicología Laboral y Organizacional\nPsicología y Educación',
    body: '6to Coloquio Regional Innovaciones en Psicología\nDoctorado en Psicología con orientación en\nPsicología Clínica\nPsicología Laboral y Organizacional\nPsicología y Educación'
  })
  noticia2.save()
  let noticia3 = new NoticiaModel({
    title: 'Concierto de la Orquesta de Cámara de la UANL',
    author: '06 Mayo 2019',
    shortBody: 'Primera Temporada de Conciertos 2019 de la Orquesta de Cámara de la UANL. Concierto con el ensamble de música antigua “Los Farsantes”, Lisa Rodríguez,soprano; Nayelli Acevedo, soprano; y Miguel Cicero, clavecín.',
    body: 'Primera Temporada de Conciertos 2019 de la Orquesta de Cámara de la UANL. Concierto con el ensamble de música antigua “Los Farsantes”, Lisa Rodríguez,soprano; Nayelli Acevedo, soprano; y Miguel Cicero, clavecín.\nDirector artístico: Mtro. Claudio Tarris.\nCoordinadora de la Orquesta: Graciela González.\n\nOrquesta de Cámara de la UANL. En el año de 1998, la Facultad de Música une los esfuerzos de profesores entusiasmados por la música de cámara, para dar vida a la Orquesta de Cámara de la Facultad de Música de la Universidad Autónoma de Nuevo León. En esta empresa, participaron maestros, estudiantes avanzados, ex maestros y ex alumnos de la propia institución, bajo la batuta de su actual director artístico y fundador, Claudio Tarris.\n\nLa orquesta está integrada por un promedio de veinte a treinta músicos, según la dotación instrumental requerida en las obras por ejecutar. A partir de febrero del 2007, realiza temporadas de conciertos en el Aula Magna, del Colegio Civil Centro Cultural Universitario, acompañando a solistas nacionales y extranjeros; en las que, además, promueve a los talentos locales. A partir del 2019, la Orquesta depende de la Secretaría de Extensión y Cultura de la UANLy cambia su nombre a Orquesta de Cámara de la UANL.\nDirige:\nClaudio Tarris, argentino naturalizado mexicano, radicado desde 1992 en Monterrey, Nuevo León, ha realizado estudios musicales, de violín, viola, dirección de orquesta, jazz y acústica musical, en Argentina, Ecuador y los Estados Unidos.\nHa desplegado una intensa actividad en distintos campos, como la dirección de orquesta, la música de cámara y la música sinfónica, como violinista y violista. También se ha desempeñado en el ámbito de la pedagogía. En la actualidad, es el director de la Orquesta de Cámara de la UANL. Ha sido director titular de la Orquesta Sinfónica de Guayaquil, Ecuador, de los ensambles orquestales de la ESMDM, así como director asistente de las orquestas sinfónicas Nacional de Ecuador y de la UANL.\nEn el año de 1994, fundó el Cuarteto de Cuerdas Monterrey y la Orquesta Sinfónica Juvenil de Monterrey; la cual recibió, durante su gestión, dos premios del Consejo para la Cultura de Nuevo León, como reconocimientos por su importancia en el campo de la formación musical de los jóvenes en esta ciudad. Ganador del Premio UANL a las Artes 2001, en el área de Artes Auditivas.\nLunes 6 de mayo del 2019. A las 20:00 horas. \nLugar: Aula Magna, del Colegio Civil Centro Cultural Universitario.\nDirección: Colegio Civil s/n, entre Washington y 5 de Mayo. Monterrey, Nuevo León.\nCooperación: 100 pesos, general/50 pesos, estudiantes, maestros y miembros del INAPAM. Adquiere tus en la taquilla del Aula Magna y en boletia.com\nInformes: 13404350.'
  })
  noticia3.save()
  let noticia4 = new NoticiaModel({
    title: 'Campeones en Atletismo de Universiada Nacional 2019',
    author: '04 Mayo 2019',
    shortBody: 'Termina la disciplina del Atletismo y los Tigres se coronan por séptima vez consecutiva en la Universiada Nacional.',
    body: 'De principio a fin, los Tigres dominaron la disciplina de atletismo en el cierre de actividades de la especialidad realizado en el Centro de Alto Rendimiento en Campeche en la Universiada Nacional 2019.\n\nEn la última jornada, la U obtuvo 4 medallas de oro, por conducto de Susana Hernández Aviña, en salto de longitud, Juan Carlos Alanís Prieto, en los 200 metros planos, Estephania Paredes Rodríguez en 5000 metros planos y en el decatlón a Felipe de Jesús Ruiz para prolongar el reinado de la UANL en el atletismo estudiantil.\n\nAviña se convirtió en tricampeona universitaria, Paredes en bicampeona , Juan Carlos Alanís obtuvo en total 3 medallas de oro durante su participación ganando los 100 y 200 metros planos y el Relevo 4×100 y Ruiz se convirtió en seis veces campeón de la Universiada Nacional.\nEl martillista Diego del Real cerro su ciclo de deportista universitario, aunque se espera su participación en la Universiada Mundial, que se realizará en Nápoles, Italia, pero su compañero juvenil José Padilla está listo para ocupar el lugar que deja el estudiante de FACPYA.\n\nEl equipo de Atletismo de Tigres, encabezado por las ex deportistas Laura Gabriela Pulido y Violeta Avila Torres mantuvieron el invicto, ya que ambas ramas no pierden el campeonato nacional universitario desde la Universiada 2013, aunque la rama femenil no pierde una Universiada Nacional desde el 2006.\nLa delegación felina recibió la visita del Rector Rogelio Garza quien convivió con ellos, los premio y les dijo que el apoyo seguirá para el deporte universitario.\nLa Universiada Nacional 2019 seguirá ahora en la Universidad Autónoma de Yucatán con las disciplinas de Box, Halterofilia, Voleibol de Sala.'
  })
  noticia4.save()
})

module.exports = router
