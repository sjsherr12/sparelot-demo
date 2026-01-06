const { SpaceTypes } = require("app/utils/optimize/utils");
const { Helmet } = require("react-helmet-async");

const ListingHelmetSchema = ({
    listing, 
    listingId
}) => {
    const listingSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `Storage Space in ${listing?.location?.city}`, // Adjust dynamically based on the listing
        "description": "A spacious and secure storage space for rent. Suitable for storing vehicles, personal items, or inventory.",
        "image": `${listing?.display?.images[0]}`,
        "brand": {
            "@type": "Organization",
            "name": "SpareLot"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": `${listing?.logistics?.price}`, // Adjust dynamically based on the listing
            "url": `https://sparelot.com/listing/${listingId}`,
        },
        "location": {
            "@type": "Place",
            "name": listing?.location?.city
        },
        "additionalProperty": [
            {
            "@type": "PropertyValue",
            "name": "Space Type",
            "value": SpaceTypes[listing?.logistics?.spaceType]
            },
            {
            "@type": "PropertyValue",
            "name": "Dimensions",
            "value": `${listing?.logistics?.length} x ${listing?.logistics?.width}`
            }
        ],
    };

    return (
        <Helmet>
            <meta
                name="description"
                content="Find convenient storage and parking by viewing listings on SpareLot"
            />
            <meta
                name="keywords"
                content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, storage and parking marketplace, SpareLot listing, space listing"
            />
            <script type="application/ld+json">
                {JSON.stringify(listingSchema)}
            </script>
        </Helmet>
    )
}

export default ListingHelmetSchema;