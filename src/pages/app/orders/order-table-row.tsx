import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { OrderDetails } from './order-details'
import type { OrderTableRowProps } from './orders'
import { OrderStatus } from '@/components/order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { toast } from 'sonner'

export function OrderTableRow({ orders }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, { orderId }) => {
      const ordersCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      // biome-ignore lint/complexity/noForEach: <explanation>
      ordersCached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: 'cancelled' }
            }
            return order
          }),
        })
      })

      toast.success('O pedido foi cancelado com sucesso!', {
        closeButton: true,
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only"> Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={orders.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {orders.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(orders.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={orders.status} />
      </TableCell>
      <TableCell className="font-medium">{orders.customerName}</TableCell>
      <TableCell className="font-medium">
        {(orders.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!['pending', 'preparing'].includes(orders.status)}
          onClick={() => cancelOrderFn({ orderId: orders.orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
