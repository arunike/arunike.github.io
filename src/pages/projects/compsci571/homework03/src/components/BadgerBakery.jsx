import { useEffect, useState } from "react"
import BakedGood from "./BakedGood";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]);
    const [featuredBakedGoods, setFeaturedBakedGoods] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
            headers: {
                "X-CS571-ID": "bid_36fdfcdcff31ac2e820585fbbbd25efbf1f9f916ea20fb1df4b5825bbf932c04"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBakedGoods(data);

            const featured = data.find(item => item.featured);
            setFeaturedBakedGoods(featured);
        })
    }, [])

    return <div style={{ fontFamily: 'Avenir', padding: '20px' }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 style={{ fontSize: '2em', marginBottom: '20px'}}>Badger Bakery</h1>
        <p>Welcome to our small-town bakery located in Madison, WI!</p>
        <p style={{ fontWeight: 'bold', fontSize: '2em', marginTop: '20px'}}>{featuredBakedGoods ? `Today's featured item is ${featuredBakedGoods.name} for $${featuredBakedGoods.price}!` : "Loading..."}</p>
        <Container>
            <Row>
            {
                bakedGoods.map(bakedGood => {
                    return <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                        <BakedGood
                            name={bakedGood.name}
                            description={bakedGood.description}
                            price={bakedGood.price}
                            featured={bakedGood.featured}
                        />
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>
}