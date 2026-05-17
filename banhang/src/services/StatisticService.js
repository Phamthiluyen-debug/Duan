import axios from 'axios'

export const getRevenue = async () => {

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/statistic/revenue`
    )

    return res.data
}