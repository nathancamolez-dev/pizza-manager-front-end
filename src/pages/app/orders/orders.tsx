import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './orders-table-filters'
import { useQuery } from '@tanstack/react-query'

import { getOrders } from '@/api/get-orders'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export interface OrderTableRowProps {
  orders: {
    status: 'pending' | 'preparing' | 'delivered' | 'delivering' | 'cancelled'
    createdAt: string
    orderId: string
    customerName: string
    total: number
  }
}

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams(prev => {
      prev.set('page', String(pageIndex + 1))
      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"> </TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"> </TableHead>
                  <TableHead className="w-[132px]"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result?.orders.map(order => {
                  return <OrderTableRow key={order.orderId} orders={order} />
                })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
