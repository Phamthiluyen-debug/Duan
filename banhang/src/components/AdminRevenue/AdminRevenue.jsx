import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

import * as StatisticService from '../../services/StatisticService'

const AdminRevenue = () => {

    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        fetchRevenue()
    }, [])

    const fetchRevenue = async () => {

        const res = await StatisticService.getRevenue()

        if (res?.status === 'OK') {
            setRevenue(res.data)
        }
    }

    return (

        <div>

            <h2>Thống kê doanh thu</h2>

            <Card
                style={{
                    width: 300,
                    marginTop: 20
                }}
            >

                <h1 style={{ color: 'green' }}>
                    {revenue.toLocaleString()} VNĐ
                </h1>

            </Card>

        </div>
    )
}

export default AdminRevenue