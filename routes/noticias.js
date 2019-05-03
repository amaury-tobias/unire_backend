var express = require('express')
var router = express.Router()

router.get('/noticias', function(req, res, next) {
  res.json([
    {
      id: 1,
      title: 'Contaminacion ¿Por los autos?',
      shortBody:
        'Et eius doloremque hic. Soluta eum vel aut temporibus adipisci ut. Porro accusamus iste autem omnis quo magni nam odio.'
    },
    {
      id: 2,
      title: 'Contaminacion',
      shortBody:
        'Et eius doloremque hic. Soluta eum vel aut temporibus adipisci ut. Porro accusamus iste autem omnis quo magni nam odio.'
    },
    {
      id: 3,
      title: 'Contaminacion una vez mas',
      shortBody:
        'Et eius doloremque hic. Soluta eum vel aut temporibus adipisci ut. Porro accusamus iste autem omnis quo magni nam odio.'
    }]
  )
})

router.get('/noticias/:id', function(req, res, next) {
  res.json({
    id: req.params.id,
    title: 'Contaminacion ¿Por los autos?',
    author: 'Cosme Fulanito',
    body: `
    Et eius doloremque hic. Soluta eum vel aut temporibus adipisci ut. Porro accusamus iste autem omnis quo magni nam odio.

    Consequatur illum suscipit quia quibusdam. Iure similique praesentium saepe consequatur aut. Itaque sapiente ut perferendis. Magnam in sit placeat temporibus quaerat sunt odio qui.

    Necessitatibus cum sed harum molestiae quaerat totam illum ratione. Qui harum similique omnis est voluptatem veniam ducimus sint. Omnis sed et officiis sequi eos.

    Debitis inventore ex et minus et quo omnis. Fugit ipsum ut vitae voluptatem. Deserunt repudiandae quis voluptate qui enim rerum. Deserunt qui enim doloribus.

    Qui ut esse rerum. Magni architecto harum aut id illo consequatur in adipisci. Illum debitis nihil sequi maiores ab odit.

    Quaerat in placeat quia sunt voluptate. Asperiores architecto soluta repellat soluta debitis voluptate. Et alias et eius in sapiente sint totam. Tempora minus id aperiam quam error. Porro ea sit cumque in sed voluptates. Nihil accusantium temporibus cum veritatis illum.

    Labore repellendus velit tempora. Ad quo aut est voluptatem qui quibusdam architecto. Nulla nesciunt laborum omnis optio explicabo architecto voluptas.

    Repellat iusto saepe esse quis doloribus sunt. Quae non voluptatum sed vel cupiditate. Consequatur quod nemo nulla id magni minus et ipsam. Aut quia omnis dolor et dolores et. Maxime debitis praesentium blanditiis reiciendis vel nisi.

    Itaque accusamus aliquam sed qui voluptatem optio illo et. Adipisci adipisci sunt unde distinctio unde error explicabo. Nesciunt incidunt cumque soluta reiciendis alias pariatur ipsam. Dolores non nobis magnam voluptates debitis alias.

    Magnam ipsam error nisi aliquam molestiae sit commodi. Ipsum cumque quibusdam quos. Sint natus qui id et molestias. Numquam est est et possimus quis.
    `
  })
})

module.exports = router
